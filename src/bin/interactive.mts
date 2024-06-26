import inquirer from 'inquirer';
import { Logger } from 'winston';
import LoggerFactory from '../logger.mjs';
import { createPackage } from '../api.mjs';
import {
  TemplateTypes,
  Defaults,
  packageNameFilter,
  packageAuthor,
  getUserTeam,
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
        type: 'input',
        name: 'packageOwnerTeamId',
        message:
          'What team will own this package? (See team.rei-cloud.com for your team id)',
        validate: (teamId) => (teamId ? true : 'Please enter a valid team id.'),
        default: async () => getUserTeam(),
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
        name: 'packageUsesDataDog',
        message:
          'Do you want to configure your app to be monitored in Datadog? If so, be sure to confirm your applicationId and clientToken with SRE prior to deploying to production.',
        default: Defaults.INCLUDE_DATADOG,
        when: (ans) => ans.packageTemplate === TemplateTypes.MICROSITE,
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
