# Dependencies

Dependency updates are packaged into the following directory structure:

* `{yyyy}-{mm}-{dd}`
  * [apps](#apps)
  * [code-extensions](#code-extensions)
    * [editor](#editor)
  * [icons](#icons)
  * [user](#user)

All links below route to the relevant resource.

## apps

**Platform**  

App | Last Version
----|-------------
[7-Zip](https://www.7-zip.org/) | 21.07
[Azure DevOps IIS Deployment Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscs-rm.iiswebapp) | 1.5.9
[Azure DevOps Pipelines Agent](https://github.com/microsoft/azure-pipelines-agent) | 2.202.1
[dotnet hosting](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) | 6.0.5
[dotnet sdk](https://dotnet.microsoft.com/en-us/download) | 6.0.300
[Git](https://git-scm.com) | 2.36.1
[IIS CORS Module](https://www.iis.net/downloads/microsoft/iis-cors-module) | 1.0
[IIS URL Rewrite Module](https://www.iis.net/downloads/microsoft/url-rewrite) | 2.1
[Node.js LTS](https://nodejs.org/en/) | 16.15.0
[PowerShell Core](https://github.com/PowerShell/PowerShell) | 7.2.4
[Visual Studio Code](https://code.visualstudio.com/) | 1.67.2

**Peripherals** 

App | Last Version
----|-------------
[iCUE](https://www.corsair.com/us/en/downloads) | 4.23.137

## code-extensions

Extension | Version
----------|---------
[Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) | 13.3.4
[Color Info](https://marketplace.visualstudio.com/items?itemName=bierner.color-info) | 0.7.0
[C#](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp) | 1.24.4
[editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) | 0.16.4
[PowerShell](https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell) | 2022.5.1
[SCSS Formatter](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter) | 2.4.2
[SVG](https://marketplace.visualstudio.com/items?itemName=jock.svg) | 1.4.18
[Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) | 1.16.4

### editor

Extension | Category | Version
----------|----------|--------
[Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) | Icons | 4.17.0
[Material Product Icons](https://marketplace.visualstudio.com/items?itemName=PKief.material-product-icons) | Product Icons | 1.3.0
[Atom One Light](https://marketplace.visualstudio.com/items?itemName=akamud.vscode-theme-onelight) | Theme | 2.2.3
[Black Ocean](https://marketplace.visualstudio.com/items?itemName=zamerick.black-ocean) | Theme | 1.1.3
[Everforest](https://marketplace.visualstudio.com/items?itemName=sainnhe.everforest) | Theme | 0.2.0
[GitHub Theme](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme) | Theme | 6.0.0
[Gruvbox Material](https://marketplace.visualstudio.com/items?itemName=sainnhe.gruvbox-material) | Theme | 6.5.0
[MacOS Modern Theme](https://marketplace.visualstudio.com/items?itemName=davidbwaters.macos-modern-theme) | Theme | 2.1.9
[Nostromo Theme](https://marketplace.visualstudio.com/items?itemName=martintheimer.nostromo-theme) | Theme | 1.0.1
[Search Lights](https://marketplace.visualstudio.com/items?itemName=radiolevity.search-lights) | Theme | 1.10.3
[Sonokai](https://marketplace.visualstudio.com/items?itemName=sainnhe.sonokai) | Theme | 0.2.9

## icons

Navigate to the links below to access the latest hosted CSS files for the icon font. Navigate to the `.woff2` URL in the `@font-face src` rule to download the latest icon font file.

* [Material Icons](https://fonts.googleapis.com/icon?family=Material+Icons)
* [Material Icons Outlined](https://fonts.googleapis.com/icon?family=Material+Icons+Outlined)

## user

1. Clean the global npm cache:

    ```bash
    npm cache clean --force
    ```

2. Cache global npm libraries

    ```bash
    # Check currently installed versions
    npm list -g --depth 0

    # Install the latest versions
    npm i -g @angular-devkit/schematics-cli @angular/cli

    # Check where the dependencies are installed
    npm root -g
    ```

3. Cache global dotnet-ef tool

    ```bash
    # Check currently installed version
    dotnet tool list --global

    # Install the latest version
    dotnet tool update --global dotnet-ef
    ```

4. Ensure the latest **C#** Visual Studio Code extension has been installed and you have opened a C# project. This will ensure the local extensions folder is updated with all of the necessary downloaded resources.

5. Copy the contents of `$env:userprofile\.dotnet\tools` to `user\.dotnet\tools`.

    **example**  

    ```PowerShell
    Copy-Item $env:userprofile\.dotnet\tools $env:desktop\export\environment\2022-05-20\user\.dotnet\tools -Recurse
    ```

6. Copy the contents of `$env:userprofile\.vscode\extensions\ms-dotnettools.csharp-{version}` to `user\.vscode\extensions\ms-dotnettools.cshar-{version}`.

    **example**  
  
    ```PowerShell
    Copy-Item $env:userprofile\.vscode\extensions\ms-dotnettools.csharp-1.24.4-win32-x64 $env:desktop\export\environment\2022-05-20\user\.vscode\extensions\ms-dotnettools.csharp-1.24.4-win32-x64 -Recurse
    ```

7. Copy the contents of `$env:appdata\npm` to `user\AppData\Roaming\npm`.

    **example**  

    ```PowerShell
    Copy-Item $env:appdata\npm $env:userprofile\desktop\export\environment\2022-05-20\user\AppData\Roaming\npm -Recurse
    ```
