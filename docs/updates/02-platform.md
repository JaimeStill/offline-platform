# Platform Updates

This document outlines the process of updating the dependencies and source files of this schematics project. It represents the `platform` directory specified at the beginning of the [**dependencies**](./01-dependencies.md) document.

While this repository is maintained on GitHub, transferring all of the source files to an environment with no internet connection each time there are updates can be a little bit wasteful. This process aims to minimize that waste and only provide a diff of the files that were changed between updates.

## user

The following tasks are intended to build out the `user` update directory with cached dependency resources.

1. Clean the global npm cache:

    ```bash
    npm cache clean --force
    ```

2. Cache global npm libraries

    ```bash
    # Check currently installed versions
    npm list -g --depth 0

    # Install the latest versions
    npm i -g @angular-devkit/schematics-cli @angular/cli npm-check-updates npm cypress

    # Check where the dependencies are installed
    npm root -g
    ```

3. Cache global cypress binaries

	```bash
	# Check currently installed version
	cypress version

	# Install binaries
	cypress install

	# Prune binary cache
	cypress cache prune
	```

4. Cache global dotnet-ef tool

    ```bash
    # Check currently installed version
    dotnet tool list --global

    # Install the latest version
    dotnet tool update --global dotnet-ef
    ```

5. Ensure the latest **C#** Visual Studio Code extension has been installed and you have opened a C# project. This will ensure the local extensions folder is updated with all of the necessary downloaded resources.

6. Copy the contents of `$env:userprofile\.vscode\extensions\ms-dotnettools.csharp-{version}` to `user\.vscode\extensions\ms-dotnettools.csharp-{version}`.

    **example**  
  
    ```PowerShell
    Copy-Item $env:userprofile\.vscode\extensions\ms-dotnettools.csharp-1.24.4-win32-x64 .\user\.vscode\extensions\ms-dotnettools.csharp-1.24.4-win32-x64 -Recurse
    ```

7. Copy the contents of `$env:userprofile\.dotnet\tools` to `user\.dotnet\tools`.

    **example**  

    ```PowerShell
    Copy-Item $env:userprofile\.dotnet\tools .\user\.dotnet\tools -Recurse
    ```

8. Copy the contents of `$env:appdata\npm` to `user\AppData\Roaming\npm`.

    **example**  

    ```PowerShell
    Copy-Item $env:appdata\npm .\user\AppData\Roaming\npm -Recurse
    ```

9. Copy the contents of `$env:localappdata\Cypress\` to `user\AppData\Local\Cypress\`.

	**example**

	```PowerShell
	Copy-Item $env:localappdata\Cypress\  .\user\AppData\Local\Cypress\ -Recurse
	```

## icons

Navigate to the links below to access the latest hosted CSS files for the icon font. Navigate to the `.woff2` URL in the `@font-face src` rule to download the latest icon font file to the [fonts](../../src/workspace/files/assets/fonts/) directory in the schematic repository.

* [Material Icons](https://fonts.googleapis.com/icon?family=Material+Icons)
* [Material Icons Outlined](https://fonts.googleapis.com/icon?family=Material+Icons+Outlined)

Add the following to the changelog:

```
/src/workspace/files/assets/fonts/
    mod material-icons-outline.woff2
    mod material-icons.woff2
```

## Schematics Updates

1. Delete the `node_cache` and `node_modules` directories, as well as the `package-lock.json` file.
2. Run `ncu -u`.
3. Run `npm i`
4. Run `npm run build`.
5. Fix any schematics source files affected by the update.
6. Annotate changelog entries for any files that were affected.
    * This can be determined my checking for source control markings.

## Update Setup

1. Generate the following project using the updated schematic:

  > The Schematics CLI was updated to automatically convert schema arguments to kebab-case. For instance, the `serverName` argument is now provided as `--server-name` when executing schematics.

    ```bash
    schematics .:platform update --server-name=Update --debug=false --skip-git
    ```

2. Once all of the files have been generated and the npm dependencies have been installed, move the directory out of the **offline-platform** directory and open in VS Code.

    ```bash
    Move-Item .\update ..\update
    cd ..\update
    code .
    ```

## Dependency Updates

During this step, it is important to research any breaking changes between versions. The following are the most relevant changelogs to this project:

* [.NET](https://docs.microsoft.com/en-us/dotnet/core/compatibility/)
* [Angular](https://github.com/angular/angular/blob/main/CHANGELOG.md)
* [Angular Components](https://github.com/angular/components/blob/main/CHANGELOG.md)

If at any point during the build phases any errors are encountered, perform any necessary migration steps until the build is successful. Annotate changes in the changelog.

### Preparation

To ensure that there aren't any cached artifacts whenever you're trying to test out installing dependencies offline from the cache, there is a PowerShell function I've written to clean up build artifacts.

At `$env:userprofile\Documents\PowerShell\Modules\Remove-BuildArtifacts`, create a file called `Remove-BuildArtifacts.psm1` and give it the following contents:

```PowerShell
function Remove-BuildArtifacts {
    param(
        [string[]]
        [Parameter()]
        $Artifacts = @('bin','obj','.angular','dist'),
        [string[]]
        [Parameter()]
        $Exclusions = @('node_cache', 'node_modules', 'nuget-packages')
    )

    Get-ChildItem -Include $Artifacts -Exclude $Exclusions -Recurse -Force `
        | Remove-Item -Force -Recurse
}
```

This will allow you to globally call the `Remove-BuildArtifacts` function in PowerShell.

### Server

1. If any additional NuGet packages are required, add them to `/server/update-deps.cmd` as well as [.package-cache\solution.json](../../.package-cache\solution.json).
    * Annotate in changelog if modified.
2. Change directory to `/server` in a terminal.
3. Execute the `clean-nuget.cmd` script.
4. Execute the `Remove-BuildArtifacts` PowerShell function.
5. Execute the `update-deps.cmd` script.
6. Capture the results of the update in the changelog either by checking the contents of the script output, or checking the updated versions in the .NET project `.csproj` files.
7. Create a local `nuget-packages` directory to be used as a local nuget package source.
8. Add the directory as a package source:
    ```PowerShell
    # Example
    dotnet nuget add source "G:\nuget-packages" -n "Local Source"
    ```
9. Disable the `nuget.org` package source:
    ```PowerShell
    dotnet nuget disable source nuget.org
    ```
10. Run the [Build-PackageCache.ps1](../../.package-cache/Build-PackageCache.ps1) script, pointed to your local NuGet source, to capture the latest dependencies locally:
    ```PowerShell
    Build-PackageCache -Cache "G:\nuget-packages"
    ```
11. Disable the internet connection on your computer.
12. Execute the `Remove-BuildArtifacts` PowerShell function.
13. Change directory back to the project root (`cd ../`).
14. Execute `npm run restore` to ensure that the cache built correctly.
15. Execute `npm run start-server` and navigate to http://localhost:5000/swagger to ensure the server is working properly.
16. End the server process with <kbd>Ctrl + C</kbd>, turn your internet connection back on, and re-enable the `nuget.org` package source:
    ```PowerShell
    dotnet nuget enable source nuget.org
    ```

### Client

1. Delete the `node_cache` and `node_modules` directories, as well as the `package-lock.json` file, if they exist.
2. If any additional npm libraries are required, add them to `install-deps.cmd` and manually install them.
    * Annotate in changelog if modified.
3. Run `ncu -u` then `npm i`.
    * Run `npm i --force` if there are any peer dependency conflicts.
4. Update the `package.json` dependencies in `/client/core/` to reflect the versions updated in the root `package.json`.
5. Delete the `node_modules` directory, disable the internet connection on your computer, and disable the `nuget.org` package source:
    ```PowerShell
    dotnet nuget disable source nuget.org
    ```
6. Execute the `Remove-BuildArtifacts` PowerShell function.
7. Execute `npm i --offline`.
8. Execute `npm run build` to ensure the `core` Angular library still builds properly.
9. Execute `npm run start-server` in one terminal. Open a second terminal with <kbd>Ctrl + Shift + 5</kbd> and perform the following tasks:
    1. Execute `npm run start-update` and navigate to http://localhost:3000 to ensure the `update` Angular app is working properly. End the process with <kbd>Ctrl + C</kbd>.
    2. Execute `npm run start-docs` and navigate to http://localhost:4000 to ensure the `docs` Angular app is working properly. End the process with <kbd>Ctrl + C</kbd>.
10. End the server process with <kbd>Ctrl + C</kbd>, turn your internet connection back on, and re-enable the `nuget.org` package source:
    ```PowerShell
    dotnet nuget enable source nuget.org
    ```
11. Annotate the following changes in the changelog:
    * /src/workspace/files/
        * update add node_cache/
        * update add package-lock.json
        * update mod package.json
    * /src/workspace/files/client/library/
        * update mod package.json

## Issues

As development of a project progresses in the disconnected environment, the structure of the architecture may change, new features may be developed, or bugs that needed to be fixed may be encountered. All of these things should be captured in the [Issues](https://github.com/JaimeStill/offline-platform/issues) section of this repository so that they can be applied during the update phase.

These updates should be applied within the generated `update` monorepo project so they can be tested. Any adjustments should be annotated on the changelog and applied to the schematic project during the below [Integrate Changes](#integrate-changes) step.

## Integrate Changes

In this step, essentially, any actions in the changelog prefixed with the term `update` were applied to the generated project and now need to be applied to the schematics files. You can remove the `update` prefix as the changes are applied.

This step is not as straightforward as you might believe. The schematics files use a special [Templating](https://github.com/angular/angular-cli/blob/main/packages/angular_devkit/schematics/README.md#templating) syntax to insert dynamic value names in both the contents of the file, as well as the file name within the file system.

> Also see [Schematics for Libraries - Add Template Files](https://angular.io/guide/schematics-for-libraries#add-template-files)

Some general guidelines:
* If a file has been removed, it is safe to remove the file in the schematics workspace as well.
* If a file or directory has been added, but is not inherently a project file (i.e. - `.gitignore`, `.editorconfig`, `node_cache`, `npm-packages`, etc.), it can be directly copied over.
* If a file has been added and is inherently a project file that would make use of any of the schema parameters (see [Workspace Schema](/src/workspace/schema.d.ts) as an example), translate those parameters using the appropriate template syntax.
* If a file has been modified, be sure that any modifications that make use of any of the schema parameters are translated to the appropriate template syntax.

When updates to `package.json` or `.csproj` files are made, more often than not, only the dependencies are being updated, so you really only need to be concerned with updating those particular sections.

The following is an example of the resulting changelog entries from the updates being captured at the time of this writing:

```txt
/src/server/files/
  mod nuget-packages/
  mod update-deps.cmd

/src/server/files/.Auth/
  mod .Auth.csproj

/src/server/files/.Core/
  mod .Core.csproj

/src/server/files/.Data/
  mod .Data.csproj

/src/server/files/.Web/
  mod .Web.csproj

/src/server/files/dbseeder/
  mod dbseeder.csproj

/src/workspace/files/
  add node_cache/
  add .npmrc
  add package-lock.json

  mod .editorconfig
  mod package.json
  mod readme.md
  mod update-deps.cmd

  rem .yarnrc
  rem clean-cache.cmd
  rem offline-cache
  rem yarn.lock

/src/workspace/files/client/library/
  mod package.json

/src/workspace/files/theme/
  mod layout.scss
```

At this point, the `update` monorepo project can be deleted.

## Test

The following steps are necessary for validating that the updated schematics project can generate the monorepo, install its dependencies, and build each project successfully in an environment without an internet connection.

1. Delete the `node_modules` directory from the root of the schematics project, disable the internet connection on your computer, and disable the `nuget.org` package source:
    ```PowerShell
    dotnet nuget disable source nuget.org
    ```
2. Open a terminal and change directory to a location outside of the `offline-platform` project (in this case, `$env:home`).
    * This is important to prevent the following command from clearing the contents of the `node_cache` directories.
3. Run `npm cache clear --force`.
4. Navigate back to the root of `offline-platform` and run `npm i --offline`.
5. Run `npm run build`.
6. Execute the following to generate a test project:

    ```bash
    schematics .:platform test --server-name=Test --debug=false --skip-git --skip-install
    ```

7. Change directory into `test` and run `npm i --offline`.
8. Change directory into `test/server` and run `clean-nuget.cmd`.
9. Change directory back to the root of `test` and run `npm run restore`.
10. Run `npm run watch-server`. Navigate to http://localhost:5000/swagger to test.
11. In a new terminal (<kbd>Ctrl + Shift + 5</kbd> in VS Code), change directory to `test` and run `npm run watch` to test the `core` Angular library.
12. In a new terminal, change directory to `test` and run `npm run start-docs`. Navigate to http://localhost:4000 to test the `docs` Angular app.
13. In a new terminal, change directory to `test` and run `npm run start-test`. Navigate to http://localhost:3000 to test the `test` Angular app.
14. In a new terminal, change directory to `test` and run:
    1. `npm run e2e-run-docs` and ensure the tests succeed.
    2. `npm run e2e-run-test` and ensure the tests succeed.
    3. `npm run e2e-merge` and ensure `report/report.json` was generated.
    4. `npm run e2e-generate` and ensure `report/report.html` was generated.

If there are issues during testing, be sure to fix them not just in the `test` project, but in the `offline-platform` schematics project. Also ensure that any additional changes are captured in the changelog.

If everything generates, installs, builds, and starts successfully, the update is successful. End all running terminal processes with <kbd>Ctrl + C</kbd>, turn your internet connection back on, and re-enable the `nuget.org` package source:

```PowerShell
dotnet nuget enable source nuget.org
```
    
The `test` project can be deleted and you can move on to building out the `platform` update directory in the final step that follows.

## Build Update Directory

In the `platform` directory specified in the [**Dependencies**](./01-dependencies.md), add the changelog and capture all of the files it specifies were added, modified, or moved. Be sure to preserve the directory structure, adding the full depth of files (even if it only contains the one file being moved). This way, you can easily update the `offline-platform` project on the disconnected network, as well as any projects that were built from this schematic.
