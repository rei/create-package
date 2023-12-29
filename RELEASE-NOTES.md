# Release Notes

## 2.4.1

- Changing the call to `metrics.view` to accommodate the stringified `__PROJECT_NAME__` global variable from `@rei/vite-base-config`.

## 2.4.0

- Setting dependency versions using variables defined in config. This synchronizes dep versions between templates and reduces the number of manual edits needed.
- Removes `@rei/cov-stats` since it's integrated into GitLab CI pipelines now.

## 2.3.1

- Update the metrics call using the `__PROJECT_NAME__` global.
- Remove extraneous quotes in GL configs.
- Auto-fix sec vuln reported by `npm audit`.

## 2.3.0

- Removing `@rei/cov-stats` from vanilla and vue templates. This is automatically run in the GL pipeline.
- Removing node versions in .env. Defaulting to LTS version in packages now to keep inline with GL pipeline set to LTS.

## 2.2.1

- Adding `index.html` file for running the dev server during microsite app development.
- Update `.nvmrc` to use LTS.

## 2.2.0

- Extracted types to a designated file
- Sorted templatized `package.json`s
- Bumped various deps in templates
- Closes #15 where `.npmrc` was not being packed in the tarball when published to the registry. We pack a `npmrc` file instead of `.npmrc` and rename it to `.npmrc` at runtime
- Adds `digret-prod` to templates' `.gitlab-ci.yml`

## 2.1.1

- Removes nodejs_version from gitlab-ci template. Packages will use the default node version from the extended `.gitlab-ci.yml` and can override on a per-package basis.

## 2.1.0

## Changes

- For Vue and Vanilla NPM package templates, replaces `.chairlift.yml` with `.gitlab-ci.yml`.
  - Adds Node version in `.env`
- Adds `tsconfig.tsbuildinfo` to all `.gitignore` files
- Corrects pointers to type declaration files in `package.json`.

## 2.0.4

- Fix unit coverage stats calls in package.jsons.

## 2.0.3

- Fix types/main/module entries in templated `package.json`s.

## 2.0.2

- Remove unneeded dependency.

## 2.0.1

- Include the dist directory in the files array in package.json.

## 2.0.0

- From 2.0.0, `@rei/create-package` will template out TypeScript configuration and entry points. The 1.x versions will continue to template out JavaScript.
- Refactor source code to TS.
- Update templates to scaffold TS.
- Add unit tests.
- Update Chairlift Node.js version from 16.13 -> 16.20
- Align `tsconfig.json` and `.eslintrc.cjs` to extend from centralized configs in `@rei/vite-base-config`.

## 1.3.1

### Bug Fixes

- Need to call `this.metricsPageView()` in `QuickStartPageComponent.vue`.
- Reference `__PROJECT_NAME__` (not `__PACKAGE_NAME__`).
- Add `__PROJECT_NAME__` to eslintrc `globals` config.

## 1.3.0

- Provide Tier 0 Analytics out-of-the-box:
  - Added the `@rei/metrics` NPM package as a dependency to `package.json`.
  - Imported `@rei/metrics` into `QuickStartPageComponent.vue` and called `metrics.view()`, passing in the project name.

## 1.2.0

- Adding `--microsite` option to scaffold out QuickStart microsite front-end code and configuration.

## 1.1.1

### Bug Fixes

- Addresses https://github.com/npm/npm/issues/7252. By design, NPM pack/publish renames `.gitignore` to `.npmpublish`. To work around this, we pack a `gitignore` file instead of `.gitignore` and rename it to `.gitignore` at runtime.

## 1.1.0

- Adding repository metadata to `package.json` templates.

## 1.0.3

- Small change to `README.md`

## 1.0.2

- Adds screencast to `README.md`

## 1.0.1

### Bug Fixes

- Explicitly includes `templates/common/.npmrc` and `templates/common/.gitignore` in npm packed tarball for publishing.

## 1.0.0

- The initial release of the NPM initializer. See `README.md`.
