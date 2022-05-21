# Offline Platform Schematics

* [Setup](#setup)
    * [Required App Installations](#required-app-installations)
    * [Globally Install Tools](#globally-install-tools)
* [Getting Started](#getting-started)
    * [Initialize a Project](#initialize-a-project)
    * [Add an App to the Workspace](#add-an-app-to-the-workspace)

> Documentation can be found in the [docs](./docs/readme.md) sub-directory.

## Setup
[Back to Top](#offline-platform-schematics)

### Required App Installations
[Back to Top](#offline-platform-schematics)

* [Node.JS - LTS](https://nodejs.org/en/)
    * No need to install additional tools via Chocolatey.
* [Git](https://git-scm.com/download/win)
* [.NET SDK](https://dotnet.microsoft.com/en-us/download)
* [SQL Server 2019 Express](https://go.microsoft.com/fwlink/?linkid=866658)
    * Run the custom setup and install a new instance.
    * When installing features, you can uncheck the box that installs Machine Learning features.
    * During setup, name your instance `DevSql`.
* [VS Code](https://code.visualstudio.com/docs/?dv=win64user)
* [SQL Server Management Studio](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15)
* [PowerShell Core](https://github.com/PowerShell/PowerShell/releases)

### Globally Install Tools
[Back to Top](#offline-platform-schematics)

```bash
# verify if npm dependencies are installed
npm list -g --depth 0

# install the latest versions
npm i -g @angular-devkit/schematics-cli @angular/cli

# verify if dotnet-ef tool is installed
dotnet tool list --global

# install if no present
dotnet tool install --global dotnet-ef

# install the latest version if present
dotnet tool update --global dotnet-ef
```

## Getting Started
[Back to Top](#offline-platform-schematics)

### Initialize a Project
[Back to Top](#offline-platform-schematics)

1. Clone this repository to your local environment with `git clone https://github.com/JaimeStill/offline-platform`

2. Open a PowerShell terminal at the location where this repository is cloned.

3. Run the following to initialize a project using the app platform:

    ```bash
    # install dependencies
    npm i

    # build the schematics
    npm run build

    # initialize a project
    schematics .:platform {name} --serverName={serverName} --debug=false

    # example
    schematics .:platform demo --serverName=Demo --debug=false
    ```

> For a list of all of the available options, see [src/platform/schema.json](./src/platform/schema.json).

Once the project is initialized, you will need to do the following:

1. Change directory into the folder created for your project.

2. Run `npm i --offline` to install dependencies.
    * This will install `node_modules` dependencies from the `node_cache` directory.

3. Run `npm run build` to build the `core` library.

You can find all of the available scripts in the `package.json` of the workspace. The following is a description of the available scripts:

Script | Executes | Description
-------|----------|------------
`npm run build` | `ng build core` | Build the `core` library used by the Angular apps
`npm run restore` | `dotnet restore ./server -s nuget-packages` | Restores NuGet packages from the cached `nuget-packages` folder in each server project.
`npm run seed` | `dotnet run --project ./server/dbseeder "Server=.\DevSql;Database={project-name}-dev;Trusted_Connection=True;"` | Seed the dev database using the `dbseeder` server project. The seeding logic is defined in `server/{Project}.Data/Extensions/DbInitializer.cs`.
`npm run start:server` | `dotnet run --project ./server/{Project}.Web` | Starts the .NET server for the workspace
`npm run update-db` | `dotnet ef database update -s ./server/{Project}.Web` | Apply the latest EF migrations to the database
`npm run start:docs` | `ng serve docs` | Starts the Angular documentation project built into the workspace
`npm run start:{app}` | `ng serve {app}` | Starts the specified Angular application
`npm run watch` | `ng build core --watch` | Builds the `core` library and watches for changes. This enables hot reloading for the library when modifications are made during development.
`npm run watch:server` | `dotnet watch run --project ./server/{Project}.Web` | Starts the .NET server for the workspace in watch mode. Any modifications to the server files will trigger a rebuild and reload automatically.

> To add content to the `docs` project, add **Markdown** files to the `/server/{Project}.Web/wwwroot/docs` directory in any folder structure you prefer.

### Add an App to the Workspace
[Back to Top](#offline-platform-schematics)

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

You can run the newly added app by executing `npm run start:{name}`. For example, `npm run start:items`.
