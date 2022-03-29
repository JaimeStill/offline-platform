# DNS and Group Policy Configuration

[Previous](./02-service-account-configuration.md) | [Home](./readme.md) | [Next](./04-sql-server-configuration.md)

> Both of the following tasks are performed on the Domain Controller, named DEVDC in this example. Replace all instances with the name of the DC you are performing the actions on. Also, replace all instances of `domain.net` with whatever is relevant to your environment.

## DNS

1. Press the <kbd>Win</kbd> key, type `DNS` and open **DNS Manager**.

2. From the sidebar, navigate to `DNS/DEVDC/Forward Lookup Zones/DOMAIN.NET`.

3. Right-click `DOMAIN.NET` in the sidebar and click **New Domain...**, give it a name that represents your project (`app` for the purposes of this documentation), and click **OK**.

4. Click into the **app** folder, right-click into the main area and click **New Host (A or AAAA)...**

    > Replace `{module}` with the endpoint name. For instance, the .NET server should be `api`, the Angular `docs` project should be `docs`, etc.

    * For every site that will be built in IIS (.NET Server + Angular Apps), an A record needs to be created resolving to the IIS server. The format for this is as follows:

        * Name (uses parent domain name if blank): `{module}`
        * Fully qualified domain name (FQDN): `{module}.app.DOMAIN.NET.`
        * IP_address: `10.10.100.20`
            > IP_address should be whatever the IIS Server IP is.
        * Create associated point (PTR) record: `yes`
        * Allow any authenticated user to update DNS records with the same owner name: `no`

    * Create an A record for all of your projects.

        * Every time an Angular app is created and integrated into the CD pipeline, a new DNS record will need to be created to associate the site it represents in IIS to the IIS server's IP address.

## Group Policy

> These settings allow pass-through authentication for IIS Windows Authentication.

1. Press the <kbd>Win</kbd> key, type `Group Policy` and open `Group Policy Management`.

2. Expand `Forest: DOMAIN.NET\Domains\DOMAIN.NET`, right-click *Default Domain Policy* and click **Edit**.

3. Modify `Computer Configuration/Policies/Administrative Templates/Windows Components/Internet Explorer/Internet Control Panel/Security Page/Site to Zone Assignment List`.

4. Set to **Enabled** then in the *Options: Enter the zone assignments here.* section, click **Show...**

5. Enter the following zone assignemnt then click **OK**:

    * **Value name:** `*.app.domain.net`
    * **Value**: `2`
        * Possible zone values are:
            Value | Setting
            ------|--------
            0 | My Computer
            1 | Local Intranet Zone
            2 | Trusted Sites Zone
            3 | Internet Zone
            4 | Restricted Sites Zone

6. Click **OK** to apply the settings and close the *Site to Zone Assignment List* GPO.

7. From within the `Security Page` folder, double-click the `Trusted Sites Zone` folder (full path is: `Computer Configuration/Policies/Administrative Templates/Windows Components/Internet Explorer/Internet Control Page/Security Page/Trusted Sites Zone`), right-click *Logon options* and click **Edit**.

8. Set to **Enabled** and in the *Options: Logon options* section, select `Automatic logon with current username and password` from the drop-down list tehn click **OK**.

[Previous](./02-service-account-configuration.md) | [Home](./readme.md) | [Next](./04-sql-server-configuration.md)