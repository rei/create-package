import { expect, describe, test } from 'vitest';
import type { Answer } from '../../types/index.mjs';
import { createPackage } from '../../api.mjs';
import { TemplateTypes, run } from '../../util.mjs';
import { resolve, dirname } from 'node:path';
import LoggerFactory from '../../logger.mjs';
import { access, rm, writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const DIRNAME = dirname(fileURLToPath(import.meta.url));
const logger = LoggerFactory({ label: '/test/e2e.test.mts' });

describe('Verificaton that all templates scaffold and build without error', () => {
  test('should successfully scaffold a Vue component template, install its dependencies, and build', async () => {
    const packageName = 'e2e-test-vue';
    const scaffoldedPath = resolve(process.cwd(), packageName);
    await clean(scaffoldedPath);
    const answers: Answer = {
      packageName,
      packageDescription: 'This is a test vue component',
      packageAuthor: 'rei',
      packageOwnerTeamId: 'testTeamId',
      packageTemplate: TemplateTypes.VUE,
      packageUsesDataDog: false,
      namespacedDir: true,
    };

    logger.info(`Executing createPackage from e2e test`);
    await createPackage({ answers });
    logger.info(`Installing dependencies in ${scaffoldedPath}`);
    const installExitCode = await run('npm i', scaffoldedPath);
    logger.info(`Running build in ${scaffoldedPath}`);
    const buildExitCode = await run('npm run build', scaffoldedPath);
    expect(installExitCode).toBe(0);
    expect(buildExitCode).toBe(0);
  });

  test('should successfully scaffold a Vanilla TypeScript template, install its dependencies, and build', async () => {
    const packageName = 'e2e-test-vanilla';
    const scaffoldedPath = resolve(process.cwd(), packageName);
    await clean(scaffoldedPath);
    const answers: Answer = {
      packageName,
      packageDescription: 'This is a test vanilla TS library',
      packageAuthor: 'rei',
      packageOwnerTeamId: 'testTeamId',
      packageTemplate: TemplateTypes.VANILLA,
      packageUsesDataDog: false,
      namespacedDir: true,
    };

    logger.info(`Executing createPackage from e2e test`);
    await createPackage({ answers });
    logger.info(`Installing dependencies in ${scaffoldedPath}`);
    const installExitCode = await run('npm i', scaffoldedPath);
    logger.info(`Running build in ${scaffoldedPath}`);
    const buildExitCode = await run('npm run build', scaffoldedPath);
    expect(installExitCode).toBe(0);
    expect(buildExitCode).toBe(0);
  });

  test('should successfully scaffold a microsite template, install its dependencies, and build', async () => {
    const packageName = 'e2e-test-microsite';
    const scaffoldedPath = resolve(process.cwd(), packageName);
    await clean(scaffoldedPath);
    const answers: Answer = {
      packageName,
      packageDescription: 'This is a test microsite',
      packageAuthor: 'rei',
      packageOwnerTeamId: 'testTeamId',
      packageTemplate: TemplateTypes.MICROSITE,
      packageUsesDataDog: false,
      namespacedDir: true,
    };

    logger.info(`Executing createPackage from e2e test`);
    await createPackage({ answers });
    logger.info(`Installing dependencies in ${scaffoldedPath}`);
    const installExitCode = await run('npm i', scaffoldedPath);
    logger.info(`Running build in ${scaffoldedPath}`);
    const buildExitCode = await run('npm run build', scaffoldedPath);
    expect(installExitCode).toBe(0);
    expect(buildExitCode).toBe(0);
  });

  test('should successfully scaffold a microsite template using the Datadog plugin, install its dependencies, and build', async () => {
    const packageName = 'e2e-test-microsite-datadog';
    const scaffoldedPath = resolve(process.cwd(), packageName);
    await clean(scaffoldedPath);
    const answers: Answer = {
      packageName,
      packageDescription: 'This is a test microsite',
      packageAuthor: 'rei',
      packageOwnerTeamId: 'testTeamId',
      packageTemplate: TemplateTypes.MICROSITE,
      packageUsesDataDog: true,
      namespacedDir: true,
    };

    logger.info(`Executing createPackage from e2e test`);
    await createPackage({ answers });

    // Datadog relies on the `pom.xml` being present to pull the
    // the application name (artifactId). Here we'll manually
    // inject ./mock.pom.xml into the scaffolded e2e-test-microsite-datadog
    // directory so the plugin can properly load it.
    await injectPom(scaffoldedPath);
    logger.info(`Installing dependencies in ${scaffoldedPath}`);
    const installExitCode = await run('npm i', scaffoldedPath);
    logger.info(`Running build in ${scaffoldedPath}`);
    const buildExitCode = await run('npm run build', scaffoldedPath);
    expect(installExitCode).toBe(0);
    expect(buildExitCode).toBe(0);
  });
});

/**
 * Tests if a file exists
 * @param filePath
 * @returns
 */
async function exists(filePath: string) {
  try {
    await access(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Injects a pom.xml similar to what is generated
 * with chairlift. This is required for vite-plugin-datadog-rum
 * @param outputPath
 */
async function injectPom(outputPath: string) {
  try {
    const pom = await readFile(resolve(DIRNAME, 'mock.pom.xml'), 'utf8');
    await writeFile(resolve(outputPath, 'pom.xml'), pom);
  } catch (err) {
    logger.error(err);
  }
}

/**
 * Remove the directory if it exists
 * @param scaffoldedPath
 */
async function clean(scaffoldedPath: string) {
  if (await exists(scaffoldedPath)) {
    logger.info(`Removing ${scaffoldedPath}`);
    await rm(scaffoldedPath, { recursive: true, force: true });
  }
}
