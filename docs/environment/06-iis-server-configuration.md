# IIS Server Configuration

[Previous](./05-build-server-configuration.md) | [Home](./readme.md) | [Next](./07-devops-configuration.md)

> When all of the following configuration is complete, make sure to stop and start IIS from an administrative PowerShell session as follows:

```PowerShell
net stop was /y
net start w3svc
```

## Server Roles and Features

**Server Roles**

* File and Storage Services
    * Storage Services
* Web Server (IIS)
    * Web Server
        * Common HTTP Features
            * Default Document
            * Directory Browsing
            * Http Errors
            * Static Content
            * HTTP Redirection
        * Health and Diagnostics
            * HTTP Logging
            * Request Monitor
            * Tracing
        * Performance
            * Static Content Compression
            * Dynamic Content Compression
        * Security
            * Request Filtering
            * URL Authorization
            * Windows Authentication
        * Application Development
            * .NET Extensibility 4.7
            * ASP.NET 4.7
            * ISAPI Extensions
            * ISAPI Filters
            * WebSocket Protocol
        * Management Tools
            * IIS Management Console
            * Management Service

**Features**

* .NET Framework 4.7 Features
    * .NET Framework 4.7
    * ASP.NET 4.7
    * WCF Services
        * TCP Port Sharing
* Remote Server Administariton Tools
    * Role Administration Tools
        * AD DS and AD LDS Tools
            * Active Directory Module for Windows PowerShell
            * AD DS Tools
                * Active Directory Administrative Center
                * AD DS Snap-Ins and Command-Line Tools
            * AD LDS Snap-Ins and Command-Line Tools
* System Data Archiver
* Windows PowerShell
    * Windows PowerShell 5.1
    * Windows PowerShell ISE
* WoW64 Support
* XPS Viewer

## Apps and Extensions

Name | Homepage | Installer
-----|----------|----------
.NET Hosting Bundle | [dot.net](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) | [link](https://dotnet.microsoft.com/en-us/download/dotnet/thank-you/runtime-aspnetcore-6.0.3-windows-hosting-bundle-installer)
IIS CORS Module | [iis.net](https://www.iis.net/downloads/microsoft/iis-cors-module) | [link](https://go.microsoft.com/fwlink/?linkid=862444)
IIS URL Rewrite Module | [iis.net](https://www.iis.net/downloads/microsoft/url-rewrite) | [link](https://download.microsoft.com/download/1/2/8/128E2E22-C1B9-44A4-BE2A-5859ED1D4592/rewrite_amd64_en-US.msi)
PowerShell Core | [PowerShell GitHub](https://github.com/PowerShell/PowerShell) | [link](https://github.com/PowerShell/PowerShell/releases)
VS Code | [code.visualstudio.com](https://code.visualstudio.com/) | [link](https://code.visualstudio.com/docs/?dv=win64user)

## VS Code Extension

* [MSBuild Project Tools](https://marketplace.visualstudio.com/items?itemName=tintoy.msbuild-project-tools)

## GMSA Installation

Open an administrative PowerShell session and execute the following:

```PowerShell
Import-Module ActiveDirectory
Install-ADServiceAccount -Identity 'gmsa-appweb'
```

## Permissions

Two service accounts:

* TFS Service Account: `svc-app-tfs`
* Group Managed Service Account: `gmsa-appweb`

Add `gmsa-appweb` to the **IIS_IUSRS** group:

1. Type <kbd>Win + R</kbd> to open the **Run...** prompt, type `lusrmgr.msc` and press <kbd>Enter</kbd>.

2. Click the **Groups** folder, then double-click the **IIS_IUSRS** group.

3. Click **Add...**, make sure the **Service Accounts** object type is selected, type `gmsa-appweb`, click **Check Names**, then click **OK**.

4. Click **OK** and close out all windows created from this task.

### Directory Permissions

The steps that follow for setting up directory permissions will need to be setup for the following directories:

Directory | Permissions | Users / Groups
----------|-------------|---------------
`C:\Windows\System32\inetsrv` | Full Control | **svc-app-tfs**, **gmsa-appweb**
`C:\ProgramData\Microsoft\Crypto` | Full Control | **svc-app-tfs**, **gmsa-appweb**
`C:\inetpub\wwwroot` | Full Control | **svc-app-tfs**, **gmsa-appweb**

1. Open file explorer and navigate to the desired parent directory.

    * For instance, if setting permissions to `inetsrv`, navigate to `C:\Windows\System32`

2. Right-click the directory you want to set permissions for, click **Properties**, click the **Security** tab, then click **Advanced**.

    * You may need to take ownership of the directory before you can adjust the permissions. Just be sure to set the owner back to **SYSTEM**.

3. Click **Change permissions**, check the *Replace all child object permission entries with inheritable permission entries from this object* option, click **Add**, then click **Select a principal**.

4. Click **Object Types...** and check **Service Accounts**, then click **OK**.

5. Type the desired account, click **Check Names**, then click **OK**.

6. Make sure the **Basic permissions** seciton matches the permissions the account or group should have.

    * For **Full Control**, ensure the following are checked:
        * Full control
        * Modify
        * Read & execute
        * List folder contents
        * Read
        * Write

7. Click **OK** then click **Apply**.

    > If you get access denied errors when clicking **Apply**, you will need to change the **Owner** to your admin account, check the box to change for all subcontainers and object, check the *Replace all child object permissions...* option, then click **Apply**. Once this is done, change the **Owner** back to **System**, including all subcontainers and objects.

8. If there are additional users, repeat steps 3 - 7. Otherwise, click **OK** and close all windows generated from this task.

## Configuration

### Environment Variables

1. Type <kbd>Win + $</kbd> to open the **Run...** prompt, type **SystemPropertiesAdvanced**, press <kbd>Enter</kbd>, then click **Environment Variables...**

2. In **System Variables**, add the following:

> `{environment}` should be **Production**, **Staging**, **Testing**, etc.

Variable | Value
---------|------
AppDirectoryBasePath | `C:\inetpub\wwwroot\api\wwwroot\files\`
AppUrlBasePath | `/files/`
ASPNETCORE_ENVIRONMENT | `{environment}`

### IIS Manager Setup

Open **Internet Information Services (IIS) Manager** and select the server (`DEVIIS` in this documentation) to access the global settings.

#### Authentication

Double-click **Authentication** in the **IIS** section.

**Anonymous Authentication** - Enabled
* Right-click -> **Edit** and set to **Application pool identity**.

**Windows Authentication** - Enabled.
* Right-click -> **Advanced Settings**  
    * Extended Protection = Off
    * Enable Kernel-mode authentication = checked
* Right-click -> **Providers**
    * Negotiate
    * NTLM

#### Authorization

Mode | Users | Verbs
-----|-------|------
Deny | Anonymous Users | GET, POST, PUT, DELETE, HEAD
Allow | All Users | Options
Allow | All Users | 

1. Double-click **Authorization Rules** in the **IIS** section.

2. Click **Add Deny Rule...** and add the first rule from the above table.

3. Click **Add Allow Rule...** and add the second rule from the above table.

#### Configuration Editor

`system.webServer/security/authentication/windowsAuthentication`

Setting | Value
--------|------
authPersistNonNTLM | True
authPersistSingleRequest | False
enabled | True
useAppPoolCredentials | True
useKernelMode | True

1. Double-click **Configuration Editor** in the **Management** section.

2. From the **Section** drop-down, navigate to `system.webServer/security/authentication/windowsAuthentication`.

3. Set `useAppPoolCredentials` to `True`.

[Previous](./05-build-server-configuration.md) | [Home](./readme.md) | [Next](./07-devops-configuration.md)