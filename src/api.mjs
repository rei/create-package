/* eslint-disable import/extensions */
import * as dotenv from 'dotenv';
import Mustache from 'mustache';
import { walk } from '@root/walk';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import LoggerFactory from './logger.mjs';
import { TemplateTypes, run } from './util.mjs';

const logger = LoggerFactory({ label: '/api' });
const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE_DIR = path.resolve(DIRNAME, '..', 'templates');

// Overriding opening and closing tags as the Vue templates use {{ }}
Mustache.tags = ['<%', '%>'];

/**
 *
 */
export const CONFIG = dotenv.config({ path: path.resolve(DIRNAME, '..', '.env') })?.parsed || {};

/**
 *
 */
export const TemplatePaths = {
  COMMON: path.resolve(TEMPLATE_DIR, 'common'),
  VUE: path.resolve(TEMPLATE_DIR, 'vue'),
  VANILLA: path.resolve(TEMPLATE_DIR, 'vanilla'),
};

/**
 *
 * @param {*} param0
 */
async function generate({
  walkPath,
  packageTemplate,
  packageWorkingDir,
  data,
}) {
  await walk(walkPath, async (err, pathname, dirent) => {
    try {
      if (err) {
        throw err;
      }
      if (dirent.isFile()) {
        // const { name: fileName } = dirent;
        const fileContents = await fs.readFile(path.resolve(pathname), 'utf8');
        // console.log(dirent);
        const renderedTemplate = Mustache.render(fileContents, data);
        // Write the rendered template to the appropriate directory

        let filePath = path.resolve(
          packageWorkingDir,
          pathname.slice(walkPath.length + 1)
        );
        const { dir } = path.parse(filePath);

        // Addresses https://github.com/npm/npm/issues/7252
        if (packageTemplate === TemplateTypes.COMMON) {
          if (filePath.includes('gitignore')) {
            filePath = filePath.replace(
              'gitignore',
              '.gitignore'
            );
          }
        }

        if (packageTemplate === TemplateTypes.VUE) {
          if (filePath.includes('[camelComponentName]')) {
            // Here we're transforming the templatized component name
            // with the name derived from the package name user input.
            const { camelComponentName } = data;
            filePath = filePath.replace(
              '[camelComponentName]',
              camelComponentName
            );
          }
        }

        // Create any nested directories from the template
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(filePath, renderedTemplate, 'utf8');
        logger.verbose(
          `Wrote: ${path.resolve(
            packageWorkingDir,
            pathname.slice(walkPath.length + 1)
          )}`
        );
      }
    } catch (error) {
      logger.error(error);
    }
  });
}

/**
 * Launching the vite development server for the newly created Vue 3 component
 *
 * @param {*} PACKAGE_WORKING_DIR
 */
async function runComponent(PACKAGE_WORKING_DIR) {
  try {
    process.chdir(PACKAGE_WORKING_DIR);
    logger.info('Booting up the Vite development server');
    await run('npm run dev');
  } catch (error) {
    logger.warn(error);
  }
}

/**
 * Handles installing the NPM deps
 *
 * @param {*} PACKAGE_WORKING_DIR
 */
async function install(PACKAGE_WORKING_DIR) {
  try {
    process.chdir(PACKAGE_WORKING_DIR);
    logger.info(
      `Running \`npm i\` in ${PACKAGE_WORKING_DIR}. This will take a moment...`
    );
    await run('npm i');
  } catch (error) {
    logger.warn(error);
  }
}

/**
 *
 * @param {*} param0
 */
export async function createPackage({ answers = {} }) {
  logger.info('Scaffolding a new NPM package');
  // First, determine if we're creating a namespaced directory for the
  // package. If not, scaffold out the package contents directly in the cwd
  const { namespacedDir = true, packageName, packageTemplate } = answers || {};
  const PACKAGE_WORKING_DIR = path.resolve(
    process.cwd(),
    namespacedDir ? packageName : ''
  );
  if (namespacedDir) {
    await fs.mkdir(PACKAGE_WORKING_DIR, { recursive: true });
  }

  logger.info(`Creating a new ${packageTemplate} in ${PACKAGE_WORKING_DIR}`);

  // Walk the "common" templates, rendering them with data from {@link answers}
  // and the {@link CONFIG}, writing them to the appropriate directory based
  // on {@link packageInCWD}.
  await generate({
    walkPath: TemplatePaths.COMMON,
    packageWorkingDir: PACKAGE_WORKING_DIR,
    data: {
      ...CONFIG,
      ...answers,
    },
  });

  // Walk the chosen template path, rendering them with data from {@link answers}
  // and the {@link CONFIG}, writing them to the appropriate directory based
  // on {@link packageInCWD}.
  if (packageTemplate === TemplateTypes.VUE) {
    // In the case of Vue, we have some dynamic component names in the template
    // that we need to replace with the component name derived from the package name
    const kebabComponentName = packageName;
    const camelComponentName = kebabComponentName
      .split('-')
      .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
      .join('');

    await generate({
      walkPath: TemplatePaths.VUE,
      packageTemplate,
      packageWorkingDir: PACKAGE_WORKING_DIR,
      data: {
        ...CONFIG,
        ...answers,
        kebabComponentName,
        camelComponentName,
      },
    });
    await install(PACKAGE_WORKING_DIR);
    await runComponent(PACKAGE_WORKING_DIR);
  } else if (packageTemplate === TemplateTypes.VANILLA) {
    await generate({
      walkPath: TemplatePaths.VANILLA,
      packageTemplate,
      packageWorkingDir: PACKAGE_WORKING_DIR,
      data: {
        ...CONFIG,
        ...answers,
      },
    });
    await install(PACKAGE_WORKING_DIR);
  }
}
