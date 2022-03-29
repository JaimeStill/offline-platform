# Requirements

[Home](./readme.md) | [Next](./02-service-account-configuration.md)

Environment setup assumes a Windows domain.

## Servers

Server | Description
-------|------------
IIS | Windows Server with IIS role and Deployment Agent
SQL | Windows Server with SQL Server
Build | Windows Server wiht Dev Tools and Build Agent
Azure | Azure DevOps Server
DC | Windows Server Domain Controller

## Accounts

> Name Security Group + Service Accounts whatever makes sense for your domain.

GMSA Security Group: `app-gmsa`

Account | Description
--------|------------
`svc-app-tfs` | Service Account for Azure Pipelines Resources
`svc-app-sql` | Service Account for Azure DevOps Server + SQL Service Account
`gmsa-appsql` | Group Managed Service Account: SQL
`gmsa-appweb` | Group Managed Service Account: IIS

[Home](./readme.md) | [Next](./02-service-account-configuration.md)