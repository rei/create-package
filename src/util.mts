import { exec } from 'node:child_process';
import { getGitUserInfo } from 'git-user-info';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import LoggerFactory from './logger.mjs';
import getUserTeam from './teams.mjs';
import type { TemplateType } from './types/index.mjs';

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
const BASE_DIR = path.resolve(DIRNAME, '..');

const logger = LoggerFactory({ label: '/util' });

export const TemplateTypes: TemplateType = {
  VUE: 'Vue 3 component',
  VANILLA: 'Vanilla TypeScript library',
  MICROSITE: 'Microsite front-end code (QuickStart)',
  COMMON: 'Common template',
};

export const Defaults = {
  PACKAGE_NAME: 'my-package',
  PACKAGE_DESC: 'description',
  PACKAGE_AUTHOR: 'REI',
  PACKAGE_NAMESPACE: true,
  PACKAGE_TEMPLATE: 'VUE', // Should map to TemplateTypes
  INCLUDE_DATADOG: false,
};

/**
 * Gets the version of `@rei/create-package`.
 */
export async function getInitializerVersion() {
  const packageJson = await readFile(
    path.resolve(BASE_DIR, 'package.json'),
    'utf8',
  );
  const packageData = JSON.parse(packageJson);
  return packageData.version;
}

/**
 *
 * @param val
 * @returns
 */
export function packageNameFilter(val: string) {
  return val
    .trim()
    .split(/\s/g)
    .map((str: string) => str.replace(/[^0-9a-zA-Z_-]/g, '').toLowerCase())
    .join('-');
}

export function validateTemplateOption(templateChoice: string) {
  const allowedTemplates = Object.keys(TemplateTypes).map((key) =>
    key.toLowerCase(),
  );
  const templateType =
    TemplateTypes[templateChoice.toUpperCase() as keyof TemplateType];
  if (templateType) {
    return templateType;
  }
  throw new Error(
    `'${templateChoice}' is an invalid template choice. Valid templates: ${allowedTemplates.join(
      ' or ',
    )}`,
  );
}

export async function packageAuthor() {
  const userInfo = (await getGitUserInfo()) || {};
  const { name: gitUserName = 'REI', email: gitEmail = '' } = userInfo;
  if (gitUserName && gitEmail) {
    return `${gitUserName} <${gitEmail}>`;
  }
  if (gitUserName) {
    return `${gitUserName}`;
  }
  return Defaults.PACKAGE_AUTHOR;
}

export async function run(cmd: string, cwd?: string) {
  const child = exec(cmd, cwd ? { cwd } : {}, (err) => {
    if (err) logger.error(err);
  });
  child.stderr?.pipe(process.stderr);
  child.stdout?.pipe(process.stdout);
  return new Promise((resolve) => {
    child.on('close', resolve);
  });
}

export { getUserTeam };
