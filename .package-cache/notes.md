# Notes

## Configuration Hierarchy

> NuGet's behavior is driven by the accumulated settings in one or more `NuGet.Config` (XML) files that can exist at project-, user-, and machine-wide levels. A global `NuGetDefaults.Config` file also specifically configured package sources. Settings apply to all commands issued in the CLI, the Package Manager Console, and the Package Manager UI.
>
> [NuGet Microsoft Docs - Common NuGet Configurations](https://docs.microsoft.com/en-us/nuget/consume-packages/configuring-nuget-behavior)

Settings are applied from top to bottom, with more specific configs overwriting broader-level configs.

Scope | `NuGet.Config` File Location | Description
------|------------------------------|------------
Solution | CUrrent folder (aka Solution folder) or any folder up to the drive root. | In a solution folder, settings apply to all projects in subfolders. Note that if a config file is placed in a project folder, it has no effect on that project.
User | **Windows**: `%appdata%\NuGet\NuGet.Config` <br />**Mac/Linux**: `~/.config/NuGet/NuGet.Config` or `~/.nuget/NuGet/NuGet.Config` (varies by OS distribution) | Settings apply to all operations, but are overridden by any project-level settings.
Computer | **Windows**: `%ProgramFiles(x86)%\NuGet\Config` <br />**Mac/Linux**: `$XDG_DATA_HOME`. If `$XDG_DATA_HOME` is null or empty, `~/.local/share` or `/usr/local/share` will be used (varies by OS distribution) | Settings apply to all operations on the computer, but are overridden by any user- or project-level settings.

## Commands

```PowerShell
# show nuget sources
dotnet nuget list source

# add nuget source
dotnet nuget add source https://api.nuget.org/v3/index.json -n nuget.org

# remove nuget source
dotnet nuget remove source "Offline Cache"

# disable nuget source
dotnet nuget disable source "Microsoft Visual Studio Offline Packages"

# enable nuget source
dotnet nuget enable source "Microsoft Visual Studio Offline Packages"

# list all cache directories
dotnet nuget locals all --list
```