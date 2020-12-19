@echo off

echo Updating dbseeder dependencies...
cd .\dbseeder
call dotnet add package Microsoft.EntityFrameworkCore.Relational
call dotnet add package Microsoft.EntityFrameworkCore.SqlServer
call dotnet restore --packages nuget-packages

echo Updating <%= classify(name) %>.Core dependencies...
cd ..\<%= classify(name) %>.Core
call dotnet add package Microsoft.EntityFrameworkCore
call dotnet restore --packages nuget-packages

echo Updating <%= classify(name) %>.Data dependencies...
cd ..\<%= classify(name) %>.Data
call dotnet add package Microsoft.EntityFrameworkCore.SqlServer
call dotnet add package Microsoft.EntityFrameworkCore.Tools
call dotnet restore --packages nuget-packages

echo Updating <%= classify(name) %>.Identity dependencies...
cd ..\<%= classify(name) %>.Identity
call dotnet add package Microsoft.Extensions.Configuration.Abstractions
call dotnet add package Microsoft.Extensions.Configuration.Binder
call dotnet add package System.DirectoryServices
call dotnet add package System.DirectoryServices.AccountManagement
call dotnet restore --packages nuget-packages

echo Updating <%= classify(name) %>.Identity.Mock dependencies...
cd ..\<%= classify(name) %>.Identity.Mock
call dotnet restore --packages nuget-packages

echo Updating <%= classify(name) %>.Office dependencies...
cd ..\<%= classify(name) %>.Office
call dotnet add package DocumentFormat.OpenXml
call dotnet restore --packages nuget-packages

echo Updating <%= classify(name) %>.Sql dependencies...
cd ..\<%= classify(name) %>.Sql
call dotnet add package Microsoft.Data.SqlClient
call dotnet add package Newtonsoft.Json
call dotnet restore --packages nuget-packages

echo Updating <%= classify(name) %>.Web dependencies...
cd ..\<%= classify(name) %>.Web
call dotnet add package Microsoft.AspNetCore.Mvc.NewtonsoftJson
call dotnet add package Microsoft.EntityFrameworkCore.Design
call dotnet restore --packages nuget-packages

cd ..
echo Dependencies successfully updated!
