@echo off

echo Updating dbseeder dependencies...
cd .\dbseeder
call dotnet add package Microsoft.EntityFrameworkCore.Relational
call dotnet add package Microsoft.EntityFrameworkCore.SqlServer

echo Updating Update.Core dependencies...
cd ..\Update.Core
call dotnet add package Microsoft.EntityFrameworkCore
call dotnet add package Newtonsoft.Json

echo Updating Update.Auth dependencies...
cd ..\Update.Auth
call dotnet add package Microsoft.EntityFrameworkCore

echo Updating Update.Data dependencies...
cd ..\Update.Data
call dotnet add package Microsoft.EntityFrameworkCore.SqlServer
call dotnet add package Microsoft.EntityFrameworkCore.Tools
call dotnet add package Newtonsoft.Json

echo Updating Update.Identity dependencies...
cd ..\Update.Identity
call dotnet add package Microsoft.Extensions.Configuration.Abstractions
call dotnet add package Microsoft.Extensions.Configuration.Binder
call dotnet add package System.DirectoryServices
call dotnet add package System.DirectoryServices.AccountManagement

echo Updating Update.Identity.Mock dependencies...
cd ..\Update.Identity.Mock

echo Updating Update.Office dependencies...
cd ..\Update.Office
call dotnet add package DocumentFormat.OpenXml

echo Updating Update.Sql dependencies...
cd ..\Update.Sql
call dotnet add package Microsoft.Data.SqlClient
call dotnet add package Newtonsoft.Json

echo Updating Update.Web dependencies...
cd ..\Update.Web
call dotnet add package Automapper
call dotnet add package Microsoft.AspNetCore.Mvc.NewtonsoftJson
call dotnet add package Microsoft.AspNetCore.OData
call dotnet add package Microsoft.EntityFrameworkCore.Design
call dotnet add package System.Linq.Dynamic.Core

echo Caching NuGet dependencies...
cd ..\
call dotnet restore --packages nuget-packages

cd ..
echo Dependencies successfully updated!
