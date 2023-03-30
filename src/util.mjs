/* eslint-disable import/extensions */
import { exec } from 'child_process';
import { getGitUserInfo } from 'git-user-info';
import LoggerFactory from './logger.mjs';

const logger = LoggerFactory({ label: '/util' });

export const TemplateTypes = {
  VUE: 'Vue 3 component',
  VANILLA: 'Vanilla JavaScript library',
};

export const Defaults = {
  PACKAGE_NAME: 'my-package',
  PACKAGE_DESC: 'description',
  PACKAGE_AUTHOR: 'REI',
  PACKAGE_NAMESPACE: true,
};

export function packageNameFilter(val) {
  return val
    .trim()
    .split(/\s/g)
    .map((str) => str.replace(/[^0-9a-zA-Z_-]/g, '').toLowerCase())
    .join('-');
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

export async function run(cmd) {
  const child = exec(cmd, (err) => {
    if (err) logger.error(err);
  });
  child.stderr.pipe(process.stderr);
  child.stdout.pipe(process.stdout);
  await new Promise((resolve) => {
    child.on('close', resolve);
  });
}
