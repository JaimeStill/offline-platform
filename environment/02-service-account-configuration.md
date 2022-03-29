# Service Account Configuration

[Previous](./01-requirements.md) | [Home](./readme.md) | [Next](./03-dns-and-group-policy-configuration.md)

> Account and Domain names provided here are examples and should be replaced with whatever is relevant to your domain infrastructure. For instance, `domain.net` should be replaced with whatever is configured for your domain. The same applies to all specified account names and URL endpoints.

## Azure DevOps Service Account

Create the `svc-app-tfs` service account in the `DOMAIN\Service Accounts` OU. Both Display Name and Logon Name are `svc-app-tfs`. Account options should be:

* User cannot change password
* Password never expires

## Group Managed Service Accounts

### Setup

This document outlines how to setup and register the IIS + SQL GMSA accounts from scratch.

> The following steps were performed on the Domain Controller.

1. Create `app-gmsa` Global Security Gruop in `DOMAIN\Security Groups`.
2. Add the following servers as members:

    * IIS Server

    * SQL Server

        > Any machines added to this group will need to be restarted so the membership can be applied.

3. Open Administrative PowerShell:

    1. `Add-KdsRootKey -EffectiveTime ((get-date).addhours(-10))`

    2. `New-ADServiceAccount -Name gmsa-appweb -Enabled $true -PrinciaplsAllowedToRetrieveManagedPassword "app-web" -KerberosEncryptionType AES128,AES256 -DNSHostName "gmsa-appweb.domain.net" -TrustedForDelegation $true`

    3. `Set-ADServiceAccount -Identity gmsa-appweb -ServicePrinciaplNames @{Add='http/api.app.domain.net', 'http/{app}.app.domain.net'}`

        * SPNs of all URLs that the GMSA will manage on the IIS server.

    4. `New-ADServiceAccount -Name gmsa-appsql -Enabled $true -PrincipalsAllowedToRetrieveManagedPassword "app-gmsa" -KerberosEncryptionType AES128,AES256 -DNSHostName "gmsa-appsql.domain.net" -TrustedForDelegation $true`

    5. `Set-ADServiceAccount -Identity gmsa-appsql -ServicePrincipalNames @{Add='MSSQLSvc/devsql.domain.net:AppSql', 'MSSQLSvc/devsql.domain.net:1433'}`

        * `devsql` is the name of the SQL Server
        * `AppSql` is the name of the SQL instance

## Installation

1. On the server, open **Server Manager**, click **Manage** and select **Add Roles and Features.**

2. In the **Features** section, enable the following:

* Remote Server Administration Tools
    * Role Administration Tools
        * AD DS and AD LDS Tools
            * Active Directory Module for Windows PowerShell
            * AD DS Tools
                * Active Directory Administrative Center
                * AD DS Snap-Ins and Command-Line Tools
            * AD LDS Snap-Ins and Command-Line Tools

3. From an administrative PowerShell, run the following to install the GMSA:

    ```PowerShell
    Import-Module ActiveDirectory

    # replace {gmsa} with the account to be installed
    Install-ADServiceAccount -Identity {gmsa}
    ```

[Previous](./01-requirements.md) | [Home](./readme.md) | [Next](./03-dns-and-group-policy-configuration.md)