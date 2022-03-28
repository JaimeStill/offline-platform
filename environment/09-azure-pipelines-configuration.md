# Azure Pipelines Configuration

## Configurations

If you want to create more than just the standard `development` and `production` configurations, the following will be needed:

1. Every application project will need an `environment.{environment}.ts` file defined at `client/{project}/environments`, and all of the relevant properties will need to be set.

2. For every application project in `angular.json`, a configuration representing the environment will need to be added to the following sections:

    * `{project}.architect.build.configurations`

    * `{project}.architect.serve.configurations`

3. In `package.json`, a `build:{env}:project` script will need to be created for every Angular project, to include the `core` library.

    * Example: `"build:prod:core": "ng build core --prod --configuration=production"

## Build Pipeline