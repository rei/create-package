#!/usr/bin/env node
import { Command } from 'commander';
import interactive from './interactive.mjs';
import {
  Defaults,
  packageAuthor,
  packageNameFilter,
  validateTemplateOption,
  getUserTeam,
  getInitializerVersion,
} from '../util.mjs';

import { createPackage } from '../api.mjs';

const program = new Command();

(async () => {
  program
    .name('create-package')
    .description('An NPM initializer that scaffolds new NPM packages')
    .version(await getInitializerVersion());

  program
    .command('interactive')
    .alias('i')
    .description('Follow command prompts to generate an NPM package')
    .action(interactive);

  program
    .command('init', { isDefault: true })
    .description('Pass options to generate an NPM package')
    .option('-n, --name <package-name>', 'package name', Defaults.PACKAGE_NAME)
    .option(
      '-d, --desc <description>',
      'package description',
      Defaults.PACKAGE_DESC,
    )
    .option('-a, --author <author-name>', 'package author')
    .option(
      '-t, --template [vue|vanilla|microsite]',
      'package template',
      Defaults.PACKAGE_TEMPLATE,
    )
    .option(
      '-dd, --datadog',
      'Configure application to be monitored by DataDog',
      Defaults.INCLUDE_DATADOG,
    )
    .option(
      '-o, --owner <package-owner-team-id>',
      'Owner team id (from team.rei-cloud.com)',
      '',
    )
    .option('--no-dir', 'Output to the current working directory')
    .action(async (answers) => {
      let { author } = answers;
      const { name, desc, template, dir, owner, datadog } = answers;
      if (!author) {
        author = await packageAuthor();
      }
      await createPackage({
        answers: {
          packageName: packageNameFilter(name),
          packageDescription: desc,
          packageAuthor: author,
          packageOwnerTeamId: owner || (await getUserTeam()),
          packageTemplate: validateTemplateOption(template),
          namespacedDir: dir,
          packageUsesDataDog: datadog,
        },
      });
    });

  program.parse();
})();
