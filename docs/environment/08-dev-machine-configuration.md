# Dev Machine Configuration

[Previous](./07-devops-configuration.md) | [Home](./readme.md) | [Next](./09-azure-pipelines-configuration.md)

Installation process is in order. If steps are left out, they are assumed to be default.

## Apps and Configuration

### SQL Server 2019 Express

* [Site](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
* [Download](https://go.microsoft.com/fwlink/?linkid=866658)

**Settings**

* Feature Selection
    * Instance Features
        * Database Engine Services
            * SQL Server Replication
            * Full-Text and Semantic Extractions for Search
    * Instance root directory: `C:\Program Files\Microsoft SQL Server\`
* Instance Configuration
    * Named Instance: `DevSql`
    * Instance ID: `DEVSQL`
* Database Engine Configuration
    * Windows authentication mode
    * Specify SQL Server administrators
        * Add relevant user accounts

### 7-Zip

* [Site](https://www.7-zip.org/)
* [Download]https://www.7-zip.org/download.html)

### VS Code

* [Site](https://code.visualstudio.com/)
* [Download](https://code.visualstudio.com/docs/?dv=win64user)

**Settings**

* Select Additional Tasks - Other:
    * Add "Open with Code" action to Windows Explorer file context menu
    * Add "Open with Code" action to Windows Explorer directory context menu
    * Register Code as an editor for supported file types
    * Add to PATH (requires shell restart)

**Configuration**

<kbd>F1</kbd> **Preferences: Open Settings (JSON)**:

```json
{
    "editor.fontLigatures": true,
    "extensions.autoCheckUpdates": false,
    "extensions.autoUpdate": false,
    "html.format.wrapAttributes": "force-aligned",
    "telemetry.enableCrashReporter": false,
    "telemetry.enableTelemetry": false,
    "update.enableWindowsBackgroundUpdates": false,
    "update.mode": "none"
}
```

<kbd>F1</kbd> **Preferences: Open Keyboard Shortcuts (JSON)**

```json
[
    {
        "command": "saveAll",
        "key": "ctrl+shift+s"
    },
    {
        "command": "workbench.action.files.saveAs",
        "key": "ctrl+k s"
    },
    {
        "command": "workbench.action.files.saveLocalFile",
        "key": "ctrl+k s",
        "when": "remoteFileDialogVisible"
    }
]
```

#### Extensions

Extension | Description | Link
----------|-------------|-----
Angular Language Service | Angular Language Service for template intellisense | [link](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
C# | Development tools for C# that includes features such as debugging, syntax highlighting, intellisense, and much more | [link](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
editorconfig | EditorConfig support for VS Code | [link](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
MSBuild Project Tools | Provides intellisense for MSBuild project files | [link](https://marketplace.visualstudio.com/items?itemName=tintoy.msbuild-project-tools)
PowerShell | Provides language support for PowerShell | [link](https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell)

### .NET 6 SDK

* [Site](https://dotnet.microsoft.com/en-us/)
* [Download](https://dotnet.microsoft.com/en-us/download)

#### `dotnet watch` Configuration

By default, when running the `dotnet watch` command, it will attempt to open a browser after successfully starting a project. To prevent this, and subsequent refresh attempts when files are changed, two environment variables need to be set.

1. Type <kbd>Win + R</kbd> to open the **Run...** prompt, type **SystemPropertiesAdvanced**, press <kbd>Enter</kbd>, then click **Environment Variables...**

2. In **System variables**, using the **New...** button, add the following environment variables:

Variable | Value
---------|------
DOTNET_WATCH_SUPPRESS_LAUNCH_BROWSER | 1
DOTNET_WATCH_SUPPRESS_BROWSER_REFRESH | 1

3. Click **OK** and close out all windows created from this task.

4. Sign out and sign back in for the changes to take effect.

### Git

* [Site](http://git-scm.com/)
* [Download](http://git-scm.com/download/win)

**Settings**

* Select Components
    * Windows Explorer integration
        * Git Bash Here
        * Git GUI Here
    * GitLFS
    * Associate .git* configuration files with the default text editor
    * Associate .sh files to be run with Bash
    * Use a TrueType font in all console windows
* Choosing the default editor used by Git
    * Use Visual Studio Code as Git's default editor
* Adjusting the name of the initial branch in new repositories
    * Override the default branch name for new repositories: `main`

### Node

* [Site](https://nodejs.org/en/)
* [Download - LTS](https://nodejs.org/en/download/)

**Settings**

* Custom Setup
    * Deselect Online documentation shortcuts

### PowerShell Core

* [Site](https://github.com/PowerShell/PowerShell)
* [Download](https://github.com/PowerShell/PowerShell/releases)

**Settings**

* Optional Actions
    * Add PowerShell to Path Environment Variable
    * Register Windows Event Logging Manifest
    * Add 'Open here' context menus to Explorer
    * Add 'Run with PowerShell 7' context menu for PowerShell files

#### Fix PowerShell Core Startup

By default, PowerShell Core attempts to establish Telemetry connections and check for updates. Being on a disconnected environment, these are undesired behaviors. Thte following steps opt out of these features and reduce certificate retrieval times.

1. Type <kbd>Win + R</kbd> to open the **Run...** prompt, type **SystemPropertiesAdvanced**, press <kbd>Enter</kbd>, then click **Environment Variables...**

2. In **System variables**, using the **New...** button, add the following environment variables:

Variable | Value
---------|------
POWERSHELL_TELEMETRY_OPTOUT | 1
POWERSHELL_UPDATECHECK | 0
POWERSHELL_UPDATECHECK_OPTOUT | 1

3. Click **OK** and close all windows created form this task.

4. Type <kbd>Win + R</kbd> to open the **Run...** prompt and type **gpedit.msc**.

5. Navigate to `Local Computer Policy\Computer Configuration\Windows Settings\Security Settings\Public Key Policies`.

6. Double-click **Certificate Path Validation Settings**, click the **Network Retrieval** tab and set the following:

    * Define these policy settings: checked
    * Default URL retrieval timeout (in seconds): 1
    * Default path validation cumulative retrieval timeout (in seconds): 1

7. Click **OK** and close out all windows created from this task.

### SQL Server Management Studio

* [Site](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms)
* [Download](https://aka.ms/ssmsfullsetup)

### Yarn

* [Site](https://classic.yarnpkg.com/lang/en/)
* [Download](https://github.com/yarnpkg/yarn/releases)

## Global Yarn and .NET Tools

In order to build the schematic and execute database migration functions, the global `yarn` and `dotnet` tools need to be archived and added to the user profile on the offline dev machine.

On a computer connected to the internet with the .NET SDK, Node, and Yarn installed, execute the following commands:

```PowerShell
yarn global add @angular-devkit/schematics-cli @angular/cli

dotnet tool install --global dotnet-ef
```

Copy the following artifacts that are generated above to the `svc-app-tfs` user profile directory:

* `$env:USERPROFILE\\.dotnet\tools`
* `$env:LOCALAPPDATA\\Yarn\bin`
* `$env:LOCALAPPDATA\\Yarn\\Data`

## App Platform

The root of this repository contains the schematics source necessary to generate an initial .NET + Angular monorepo suitable for an offline environment.

1. Open `pwsh` from the root of the directory containing the files in this repository and execute the following:

    ```PowerShell
    # install third-party npm dependencies
    yarn install --offline

    # build the schematics application
    yarn build

    <#
        generate the monorepo from the schematics platform.
        be patient, this command can take a while to execute
        depending on the specs of your machine.
    #>
    schematics .:platform playground --serverName=Playground --debug=false --skipGit --skipInstall
    ```

    > Be sure to replace `playground` and `Playground` with your desired monorepo name.

2. Cut and paste the **playground** directory to the desired location and open in VS Code.

3. Execute the following from the Integrated Terminal:

    ```PowerShell
    # install third-party npm dependencies
    yarn install --offline

    # install third-party NuGet dependencies
    yarn restore

4. Now that the project has been generated and all of the dependencies have been restored, you can now run it. With four split terminals open (you can open a split terminal with the <kbd>Ctrl+Shift+5</kbd> shortcut), execute the following commands, one command per terminal:

    > You must wait for `yarn watch` to complete before executing any `yarn start:{app}` commands. Otherwise, `{app}` will not have athe compiled core library.

    ```PowerShell
    # terminal 1
    yarn watch:server

    # terminal 2
    yarn watch

    # terminal 3
    yarn start:docs

    # terminal 4
    <#
        replace playground with whatever was
        used to initialize the monorepo.
    #>
    yarn start:playground
    ```

Test the following links:

Type | URL
-----|----
Server | http://localhost:5000/swagger
Docs | http://localhost:4000
App | http://localhost:3000

[Previous](./07-devops-configuration.md) | [Home](./readme.md) | [Next](./09-azure-pipelines-configuration.md)