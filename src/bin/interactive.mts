import inquirer from 'inquirer';
import { Logger } from 'winston';
import LoggerFactory from '../logger.mjs';
import { createPackage } from '../api.mjs';
import {
  TemplateTypes,
  Defaults,
  packageNameFilter,
  packageAuthor,
} from '../util.mjs';

const logger: Logger = LoggerFactory({ label: '/interactive' });

export default async function interactive() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'packageName',
        message: 'What would you like to call this NPM package?',
        filter(val) {
          if (!val) {
            return Defaults.PACKAGE_NAME;
          }
          return packageNameFilter(val);
        },
      },
      {
        type: 'input',
        name: 'packageDescription',
        message: 'What does this package do?',
        default: Defaults.PACKAGE_DESC,
      },
      {
        type: 'input',
        name: 'packageAuthor',
        message: 'Who is the author of this package?',
        default: async () => packageAuthor(),
      },
      {
        type: 'rawlist',
        name: 'packageTemplate',
        message: 'What kind of NPM package are you creating?',
        default: TemplateTypes.VUE,
        choices: [
          TemplateTypes.VUE,
          TemplateTypes.VANILLA,
          TemplateTypes.MICROSITE,
        ],
      },
      {
        type: 'confirm',
        name: 'namespacedDir',
        message:
          'Should we create a namespaced directory for this package? If no, files will output to the CWD. (Select "n" for microsite)',
        default: Defaults.PACKAGE_NAMESPACE,
      },
    ]);
    await createPackage({ answers });
  } catch (error) {
    logger.error(error);
  }
}
