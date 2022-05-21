# Updates

* [Dependencies](./01-dependencies.md)
* [Platform](./02-platform.md)

## Server Dependency Graph Template

Keep up to date with the current state of NuGet package dependencies and their versions within the server projects:

```
.NET - 6.0.0 :
Microsoft.Extensions...
System.DirectoryServices...
* Update.Identity.csproj

Automapper - 11.0.1 :
* Update.Web.csproj

DocumentFormat.OpenXml - 2.16.0 :
* Update.Office.csproj

EF Core - 6.0.5 :
* dbseeder.csproj
* Update.Auth.csproj
* Update.Core.csproj
* Update.Data.csproj

Microsoft.AspNetCore.Mvc.NetwonsoftJson - 6.0.5 :
* Update.Web.csproj

Microsoft.AspNetCore.OData - 8.0.10 :
* Update.Web.csproj

Microsoft.Data.SqlClient - 4.1.0 :
* Update.Sql.csproj

Newtonsoft.Json - 13.0.1 :
* Update.Core.csproj
* Update.Data.csproj
* Update.Sql.csproj

Swashbuckle.AspNetCore - 6.1.0 :
* Update.Web.csproj

System.Linq.Dynamic.Core - 1.2.18 :
* Update.Web.csproj
```
