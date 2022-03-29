# SQL Server Configuration

[Previous](./03-dns-and-group-policy-configuration.md) | [Home](./readme.md) | [Next](./05-build-server-configuration.md)

## GMSA Installation

1. Open **Server Manager** and open **Add Roles and Features**.
2. Make sure the following features are installed:

* Remote Server Administration Tools
    * Role Administration Tools
        * AD DS and AD LDS Tools
            * Active Directory module for Windows PowerShell
            * AD DS Tools
                * Active Directory Administrative Center
                * AD DS Snap-Ins and Command-Line Tools
            * AD LDS Snap-Ins and Command-Line Tools

3. Restart the Server if necessary.
4. Open an administrative PowerShell session and execute the following:

    ```PowerShell
    Import-Module ActiveDirectory
    Install-ADServiceAccount -Identity 'gmsa-appsql'
    ```

## SQL Server Installation

> The version installed for this documentation is SQL Server 2016 Enterprise SP1.

1. Mount the SQL Server ISO and run `setup.exe`.

2. Click **Installation** in the sidebar and click **New SQL Server stand-alone installation or add features to an existing installation**.

    > Only steps in the installation process with actions required are outlined. If a section does not require an action, simply click **Next >** in the installation setup.

3. In **License Terms**, check *I accept the license terms* and click **Next >**

    > If installing offline, the Product Updates step will be unable to connect to the internet and will show an error. You can simply click **Next > ** without issues.

4. In the **Feature Selection** section, include the following features:

    * Database Engine Services
        * SQL Server Replication
        * Full-Text and Semantic Extractions for Search
    * Reporting Services - Native
    * Client Tools Connectivity

5. Create the directory `C:\Data` and use as the value for **Instance root directory:**, then click **Next >**

6. In the **Instance Configuration** section, set the **Named instance** to whatever is relevant for you (**AppSql** for this documentation), then click **Next >**

7. Setup the **SQL Server Database Engine** Service Account to `gmsa-appsql`:

    1. In the **Account Name** drop-down next to the **SQL Server Database Engine** Service, click **<<Browse...>>**
    2. Make sure the **Service Account** Object Type is selected and the location is pointed to the domain, type `gmsa-appsql` and click **Check Names**, then click **OK**.
    3. Click **Next >**

8. In the **Database Engine Configuration** section, in the **Specify SQL Server administrators** section, add the `Domain Admins` security group as well as `gmsa-appsql` by clicking **Add...** and searching those names

    > Any accounts that are part of the Domain Admins security gruop must be explicitly added in this step if you want them to be abel to connect from the SQL Server itself. You do not need to add accounts if they will just be connecting from remote connections.

9. Click **Install** and finalize the SQL Server installation.

## Firewall Configuration

1. Press the <kbd>Win</kbd> key, type `Windows Defender Firewall` and open the corresponding application.

2. Click **Advanced settings** in the sidebar.

3. Click **Inbound Rules** in the left sidebar.

4. Click **New Rule...** in the **Actions** section of the right sidebar:

    1. Keep **Program** selected and click **Next >**
    2. Keep **This program with path:** selected, click **Browse...** and select `C:\Data\MSSQL13.APPSQL\MSSQL\Binn\sqlservr.exe`
    3. Keep **Allow the connection** selected and click **Next >**
    4. Keep all three profiles checked and click **Next >**
    5. Provide the name `SQL Remote Connection` and click **Finish**

5. Click **New Rule...** in the **Actions** section of the right sidebar:

    1. Select **Port** and click **Next >**
    2. Select **UDP**, keep **Specific lcoal ports:** selected and input `1434`, then click **Next >**
    3. Keep **Allow the connection** selected and click **Next >**
    4. Keep all three profiles checked and click **Next >**
    5. Provide the name **SSMS Connection** and click **Finish**

## SSMS Install and Connection

1. Download and run [SQL Server Management Studio](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms).

2. Click **Install** and reboot the server when complete.

3. Press the <kbd>Win</kbd> key and type `Management Studio`, then open `Microsoft SQL Server Management Studio 18`.

4. You can connect to the instance using **Server name**: `DEVSQL\AppSql` using **Windows Authentication**.

[Previous](./03-dns-and-group-policy-configuration.md) | [Home](./readme.md) | [Next](./05-build-server-configuration.md)