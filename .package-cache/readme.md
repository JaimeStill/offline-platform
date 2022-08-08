# Package Cache

This project provides the ability to generate a NuGet Package cache based on a series of dependencies defined in a provided JSON file. The generated cache can then be placed on a file share located on a network with no internet, and serve as a NuGet package feed.

## Script

[Build-PackageCache.ps1](./Build-PackageCache.ps1)

> Supporting functions are defined in [`functions.ps1`](./functions.ps1) and dot sourced into [Build-PackageCache.ps1](./Build-PackageCache.ps1)

Property | Type | Default Value | Description
---------|------|---------------|------------
`Cache` | **string** | nuget-packages | The cache target directory
`Source` | **string** | solution.json | The JSON file containing information in the [JSON Schema](#json-schema) format outlined below
`KeepSolution` | **switch** | null | When present, do not remove the solution generated to produce the cache
`SkipClean` | **switch** | null | When present, prevent the script from cleaning the local NuGet cache (`dotnet nuget locals all --clear`)

## JSON Schema

An array of objects that provide metadata for a .NET project. Object schema is as follows:

* `name` - The name of the Project
* `template` - The `dotnet new {template}` to use to generate the project
* `dependencies` - An array of NuGet package dependencies to use with `dotnet add package {dependency}`. To specify a version, use the following format: `package@version`.

### Example

```json
[
    {
        "name": "Core",
        "template": "classlib",
        "dependencies": [
            "DocumentFormat.OpenXml",
            "Microsoft.Data.SqlClient",
            "Microsoft.EntityFrameworkCore",
            "Microsoft.EntityFrameworkCore.Design",
            "Microsoft.EntityFrameworkCore.Relational",
            "Microsoft.EntityFrameworkCore.SqlServer",
            "Microsoft.EntityFrameworkCore.Tools",
            "Microsoft.Extensions.Configuration.Abstractions",
            "Microsoft.Extensions.Configuration.Binder",
            "Newtonsoft.Json",
            "System.DirectoryServices",
            "System.DirectoryServices.AccountManagement"
        ]
    },
    {
        "name": "Test",
        "template": "xunit",
        "dependencies": [
            "AutoFixture.AutoMoq",
            "AutoFixture.xUnit2",
            "Coverlet.Collector",
            "Microsoft.NET.Test.Sdk",
            "xUnit",
            "xUnit.Runner.VisualStudio"
        ]
    },
    {
        "name": "Web",
        "template": "webapi",
        "dependencies": [
            "Automapper",
            "Microsoft.AspNetCore.Mvc.NewtonsoftJson",
            "Microsoft.AspNetCore.OData",
            "Microsoft.Data.SqlClient@2.1.4",
            "Serilog.AspNetCore",
            "Swashbuckle.AspNetCore",
            "Swashbuckle.AspNetCore.Newtonsoft",
            "System.Linq.Dynamic.Core"
        ]
    }
]
```
