# Release notes
## 1.2.1

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
