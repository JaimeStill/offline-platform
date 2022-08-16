# Dependencies

This document deals with capturing any changes to the tools and extensions needed to support development within this platform in an offline environment.

Dependency updates are packaged into the following directory structure:

* `{yyyy}-{mm}-{dd}`
  * [apps](#apps)
  * [code-extensions](#code-extensions)
    * [editor](#editor)
  * [icons](./02-platform.md#icons)
  * [platform](./02-platform.md)
  * [server](#server)
  * [user](./02-platform.md#user)

All links below route to the relevant resource.

Be sure to maintain the list of resources, as well as the **Last Version** of any resource updated, during each update cycle so that this document remains relevant.

## apps

App | Last Version
----|-------------
[7-Zip](https://www.7-zip.org/) | 22.01
[dotnet sdk](https://dotnet.microsoft.com/en-us/download) | 6.0.400
[Git](https://git-scm.com) | 2.37.2.2
[iCUE](https://www.corsair.com/us/en/downloads) | 4.26.110
[Node.js LTS](https://nodejs.org/en/) | 16.16.0
[PowerShell Core](https://github.com/PowerShell/PowerShell) | 7.2.6
[Visual Studio Code](https://code.visualstudio.com/) | 1.70.1

## server

App | Last Version
----|-------------
[Azure DevOps IIS Deployment Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscs-rm.iiswebapp) | 1.5.9
[Azure DevOps Pipelines Agent](https://github.com/microsoft/azure-pipelines-agent) | 2.206.1
[dotnet hosting](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) | 6.0.7
[IIS CORS Module](https://www.iis.net/downloads/microsoft/iis-cors-module) | 1.0
[IIS URL Rewrite Module](https://www.iis.net/downloads/microsoft/url-rewrite) | 2.1

## code-extensions

Extension | Version
----------|---------
[Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) | 14.1.0
[Color Info](https://marketplace.visualstudio.com/items?itemName=bierner.color-info) | 0.7.0
[C#](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp) | 1.25.0
[editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) | 0.16.4
[GitHub Theme](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme) | 6.3.2
[Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) | 4.19.0
[Material Product Icons](https://marketplace.visualstudio.com/items?itemName=PKief.material-product-icons) | 1.3.0
[PowerShell](https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell) | 2022.7.2
[SCSS Formatter](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter) | 2.4.3
[SVG](https://marketplace.visualstudio.com/items?itemName=jock.svg) | 1.4.19
[Task Explorer](https://marketplace.visualstudio.com/items?itemName=spmeesseman.vscode-taskexplorer) | 2.9.1
[Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) | 1.17.1
[VS Code Solution Explorer](https://marketplace.visualstudio.com/items?itemName=fernandoescolar.vscode-solution-explorer) | 0.5.0

## nuget-packages

In the [.package-cache](../../.package-cache) directory, run the [Build-PackageCache.ps1](../../.package-cache/Build-PackageCache.ps1) script, capturing the `nuget-packages` directory in the root of the current update directory. This will also be executed anytime there are updates to [solution.json](../../.package-cache/solution.json) as a result of changes to server dependencies.

```PowerShell
# Example
.\Build-PackageCache.ps1 -Cache "G:\export\environment\updates\2022-08-05\nuget-packages"
```

The directory that this generates will be used to update the NuGet package sources provided on the internal network file shares. To add the file share sources to the global NuGet configuration, run the following:

```bash
dotnet nuget add source {location} -n {name}

# Example - Be sure to provide unique names based on the location
# of the file share server.
dotnet nuget add source S:\Dev\nuget-packages -n "Network Source"
```
