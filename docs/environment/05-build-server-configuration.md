# Build Server Configuration

[Previous](./04-sql-server-configuration.md) | [Home](./readme.md) | [Next](./06-iis-server-configuration.md)

## App Installation

If the installation for an app is non-default, its header will link to installation instructions. Additional information for the app installation relative to the build server will be provided beneath the header link if necessary.

### VS Code
[Download](https://code.visualstudio.com/#alt-downloads)

### 7-Zip
[Download](https://www.7-zip.org/download.html)

### .NET SDK
[Download](https://dotnet.microsoft.com/en-us/download)

### [Git](./08-dev-machine-configuration.md#git)
[Download](http://git-scm.com/)

### [Node](./08-dev-machine-configuration.md#node)  
[Download](https://nodejs.org/en/download/)  
> Download LTS version

### [PowerShell Core](./08-dev-machine-configuration.md#powershell-core)
[Download](https://github.com/PowerShell/PowerShell/releases)
> Download latest

### Yarn
[Download](https://github.com/yarnpkg/yarn/releases)

## Service Account Configuration

> Replace `svc-app-tfs` with whatever Service Account name is relevant to your domain.

Whenever the CI build process is executed, it does so using the `svc-app-tfs` account. Before the build can be successfully executed, the aspect of the environment setup related ot the user profile needs to be configured for the service account.

First, a user profile directory for the service account needs to exist on the build server. To create this, perform the following steps:

1. Holding the <kbd>Shift</kbd> key, right-click **PowerShell Core** in the *Taskbar* or *Start Menu* and click **Run as different user**.

2. Input `svc-app-tfs` and the relevant password, then click **OK**.

3. Verify that the service account now has a user account folder in `C:\Users`.

If you need to build a .NET cache because projects are not restoring properly, perform the following steps:

1. From a PowerShell session running as `svc-app-tfs` pointed at `C:\Users\svc-app-tfs`, run `mkdir .projects` and then `cd .projects`.

2. Run `git clone http://devazure.domain.net/Projects/app/_git/app` then cd `app\server\`
    > Replace with the Azure DevOps Repo URL for the app you are setting up.

3. Run `dotnet restore -s .\nuget-packages`.

4. `cd ..\..` and run `yarn restore` to verify that the command will now successfully execute.

## Environment

In order for `svc-app-tfs` to execute the builds, the global **Yarn** and **.NET** tools need to be installed for that account.

On a computer connected to the internet with the .NET SDK, Node, and Yarn installed, execute the following commands:

```PowerShell
yarn global add @angular-devkit/schematics-cli @angular/cli

dotnet tool install --global dotnet-ef
```

Copy the following artifacts that are generated above to the `svc-app-tfs` user profile directory:

* `$env:USERPROFILE\\.dotnet\tools`
* `$env:LOCALAPPDATA\\Yarn\bin`
* `$env:LOCALAPPDATA\\Yarn\\Data`

[Previous](./04-sql-server-configuration.md) | [Home](./readme.md) | [Next](./06-iis-server-configuration.md)