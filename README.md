# Create package

The officially supported way to create NPM packages at [REI](https://www.rei.com/).

With `@rei/create-package`, you can quickly scaffold a [Vue](https://vuejs.org/) component compiled by [Vite](https://vitejs.dev/) and configured with REI default settings. Or scaffold a vanilla JavaScript library that's ready to be imported into your application.

Report bugs in the [issues](https://github.com/rei/create-package/issues) tab.

## Usage

```sh
npx @rei/create-package
```

<div style="text-align: center;">
    <img src='https://www.rei.com/satchel/media/img/rei-create-package.gif' alt='npx @rei/create-package' width="500">
</div>

## CLI

### Commands

#### `npx @rei/create-package`

This command is preset to generate a Vue 3 project from the `templates/vue` template directory. See the options section to inspect default values for options used by the command.

- Create a Vue 3 NPM package called "carousel"

```sh
npx @rei/create-package --name carousel
```

- Create a vanilla JavaScript library

```sh
npx @rei/create-package --name js-lib --template vanilla
```

#### `npx @rei/create-package [interactive|i]`

Use "interactive mode" to follow command prompts to generate an NPM package.

### Options

`-n, --name <package-name>`

The name of the NPM package we're intializing. Defaults to `my-package`

`-d, --desc <description>`

The description of the NPM package we're intializing. Defaults to `description`

`-a, --author <author-name>`

The author of the NPM package we're intializing. Attempts to resolve the user's git username and email, otherwise defaults to `REI`.

`-t, --template [vue|vanilla]`

The type of template we're initializing. Defaults to `vue`.

`--no-dir`

Using this option will tell the initializer to output to the current working directory, instead of creating a namespaced directory matching the package name.

## Anatomy

`@rei/create-package` is an [NPM initializer](https://docs.npmjs.com/cli/v9/commands/npm-init) written in Node.js.

Its mechanics are written to be agnostic of any particular technology's generator. Meaning it doesn't rely on [Vue CLI](https://cli.vuejs.org/) or anything similar.

The logic recurses through the chosen template files and uses a [template system](https://www.npmjs.com/package/mustache) to inject contextual data into outputted projects.

### Templates

Templates are divided by type in their directories. Template directories contain contextual files relevant to their type.

```
@rei/create-package
├── templates
│   ├── common
│   │   ├── .chairlift.yml
│   │   └── .npmrc
│   ├── vue
│   └── vanilla
...
```

`common` is a directory of shared files that are output for every template type.

### Environment variables

`@rei/create-packages` uses `dotenv` (and `.env`) to hold configuration variables that are injected into necessary templates.

## Integration with Chairlift

This tool helps you scaffold out a new NPM package but it doesn't set up source control management (SCM) or a CI/CD pipeline, features that you'll want to facilitate the growth and maturity of your package.

REI uses an internal tool called Chairlift that sets up SCM and a CI/CD pipeline for your new package. It has an `npm-package-template` containing a bare-bones file structure with instructions on running this initializer.

## Contributing

Modify existing templates freely. Add envirnonmental variables to `.env` to make them available for render.

Adding a new template is a more involved process. You'll need to create a new template directory and then ensure the Node scripts can process it.

For help, reach out to the [#alpine-frontend-users](https://rei.slack.com/archives/CLWJC9FFW) slack channel.
