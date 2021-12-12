# Platform Schematics

* [Setup](#setup)
    * [Required App Installations](#required-app-installations)
    * [Globally Install Tools](#globally-install-tools)
* [Getting Started](#getting-started)
    * [Initialize a Project](#initialize-a-project)
    * [Add an App to the Workspace](#add-an-app-to-the-workspace)

## Setup
[Back to Top](#platform-schematics)

### Required App Installations
[Back to Top](#platform-schematics)

* [Node.JS - LTS](https://nodejs.org/en/)
    * No need to install additional tools via Chocolatey.
* [Git](https://git-scm.com/download/win)
* [Yarn](https://classic.yarnpkg.com/latest.msi)
* [.NET 6 SDK](https://dotnet.microsoft.com/en-us/download)
* [SQL Server 2019 Express](https://go.microsoft.com/fwlink/?linkid=866658)
    * Run the custom setup and install a new instance.
    * When installing features, you can uncheck the box that installs Machine Learning features.
    * During setup, name your instance `DevSql`.
* [VS Code](https://code.visualstudio.com/docs/?dv=win64user)
* [Azure Data Studio](https://go.microsoft.com/fwlink/?linkid=2142210)

### Globally Install Tools
[Back to Top](#platform-schematics)

```bash
yarn global add @angular-devkit/schematics-cli @angular/cli

dotnet tool install --global dotnet-ef 
```

> To update the `dotnet-ef tool`, run `dotnet tool update --global dotnet-ef`.

## Getting Started
[Back to Top](#platform-schematics)

### Initialize a Project
[Back to Top](#platform-schematics)

1. Clone this repository to your local environment with `git clone https://github.com/JaimeStill/platform`

2. Open a PowerShell terminal at the location where this repository is cloned.

3. Run the following to initialize a project using the app platform:

```bash
# install dependencies
yarn install

# build the schematics
yarn build

# initialize a project
schematics .:platform {name} --serverName={serverName} --debug=false

# example
schematics .:platform demo --serverName=Demo --debug=false
```

> For a list of all of the available options, see [src/platform/schema.json](./src/platform/schema.json).

Once the project is initialized, you will need to do the following:

1. Change directory into the folder created for your project.

2. Run `yarn install --offline` to install dependencies.
    * This will install `node_modules` dependencies from the `offline-cache` directory in `./client`.

3. Run `yarn build` to build the `core` library.

You can find all of the available scripts in the `package.json` of the workspace. The following is a description of the available scripts:

Script | Executes | Description
-------|----------|------------
`yarn build` | `ng build core` | Build the `core` library used by the Angular apps
`yarn restore` | `dotnet restore ./server -s nuget-packages` | Restores NuGet packages from the cached `nuget-packages` folder in each server project.
`yarn start:server` | `dotnet run --project ./server/{Project}.Web` | Starts the .NET Core server for the workspace
`yarn start:docs` | `ng serve docs` | Starts the Angular documentation project built into the workspace
`yarn start:{app}` | `ng serve {app}` | Starts the specified Angular application
`yarn watch` | `ng build core --watch` | Builds the `core` library and watches for changes. This enables hot reloading for the library when modifications are made during development.

> To add content to the `docs` project, add **Markdown** files to the `/server/{Project}.Web/wwwroot` directory in any folder structure you prefer.

### Add an App to the Workspace
[Back to Top](#platform-schematics)

1. From the root of the project workspace (where the `angular.json` file is located), open a PowerShell terminal.

2. Run the following command:

```bash
ng g {relative path to platform/src}:collection.json {name} --port={port}

# example
ng g ../../../platform/src:collection.json items --port=3001
```

> For a list of all of the available options, see [src/app/schema.json](./src/app/schema.json)

This will create a new folder with the name provided in the `./client` directory of your workspace.

After the app is added to the workspace, you need to add the debug URL to the `CorsOrigins` array specified in the `./server/{Project}.Web/appsettings.Development.json` file. See [appsettings.Development.json](./src/server/files/__name@classify__.Web/appsettings.Development.json).

You can run the newly added app by executing `yarn start:{name}`. For example, `yarn start:items`.
