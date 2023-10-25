#!/usr/bin/env node
import { Command } from 'commander';
import interactive from './interactive.mjs';
import {
  Defaults,
  packageAuthor,
  packageNameFilter,
  validateTemplateOption,
} from '../util.mjs';

import { createPackage } from '../api.mjs';

const program = new Command();

program
  .name('create-package')
  .description('An NPM initializer that scaffolds new NPM packages')
  .version('2.0.0');

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
  .option('-t, --template [vue|vanilla]', 'package template', Defaults.PACKAGE_TEMPLATE)
  .option(
    '--no-dir',
    'Output to the current working directory',
  )
  .action(async (answers) => {
    let { author } = answers;
    const {
      name, desc, template, dir,
    } = answers;
    if (!author) {
      author = await packageAuthor();
    }
    await createPackage({
      answers: {
        packageName: packageNameFilter(name),
        packageDescription: desc,
        packageAuthor: author,
        packageTemplate: validateTemplateOption(template),
        namespacedDir: dir,
      },
    });
  });

program.parse();
