import inquirer from 'inquirer';
import LoggerFactory from '../src/logger.mjs';
import { createPackage } from '../src/api.mjs';
import {
  TemplateTypes,
  Defaults,
  packageNameFilter,
  packageAuthor,
} from '../src/util.mjs';

const logger = new LoggerFactory({ label: '/interactive' });

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
        choices: [TemplateTypes.VUE, TemplateTypes.VANILLA],
      },
      // {
      //   type: 'confirm',
      //   name: 'packageCustomerFacing',
      //   message: `Is your ${TemplateTypes.VANILLA} customer facing?`,
      //   default: true,
      //   when(answerObj) {
      //     return answerObj.packageTemplate === TemplateTypes.VANILLA;
      //   },
      // },
      {
        type: 'confirm',
        name: 'namespacedDir',
        message:
          'Should we create a namespaced directory for this package? If no, files will output to the CWD.',
        default: Defaults.PACKAGE_NAMESPACE,
      },
    ]);
    await createPackage({ answers });
  } catch (error) {
    logger.error(error);
  }
}
