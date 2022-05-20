# URL Rewrite and CORS Configuration

[Previous](./09-azure-pipelines-configuration.md) | [Home](./readme.md)

> Replace all environment / project specific names with whatever is relevant to your environment.

## Backup

> Remote into DEVIIS to perform these tasks

Before performing the following steps, it is important to create a backup of the `applicationHost.config` file in its current state. This way, if a configuration ever breaks, you have a clean restore point.

In order to standardize the location of the backup, create and execute the following PowerShell script in `C:\`:

**backup-config.ps1**

```PowerShell
param(
    [Parameter()]
    [string]$src = 'C:\Windows\System32\inetsrv\Config\',
    [Parameter()]
    [string]$dest = 'C:\.backup',
    [Parameter()]
    [string]$file = 'applicationHost.config'
)

if (!(Test-Path $dest)) {
    New-Item $dest -ItemType Directory;
}

$srcFile = [IO.Path]::Combine($src, $file);
$destFile = [IO.Path]::Combine($dest, $file);

Write-Output "Copying $srcFile to $destFile";

Copy-Item $srcFile $destFile -Force -Recurse;
```

## Configuration

> Remote into DEVIIS to perform these tasks.
>
> This section will need to be maintained as the application is developed and modules are added.  
>
> For every non-Angular route, an input condition will need to be added to the **URL Rewrite Rule**.  
> 
> For every Angular app, a **CORS Configuration** setting will need to be defined relative to that origin.

1. Navigate to `C:\Windows\System32\inetsrv\Config` and type `code .` in the address bar, then press **Enter**.

    * This should open the directory in Visual Studio Code

2. At the bottom of the file, just before the `</configuration>` closing tag, create the following configuration settings:

    ```xml
    <!-- URL Rewrite Rules -->
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="angular-dotnet-routes" stopProcessing="true">
                    <match url=".*" />
                    <conditions logicalGrouping="MatchAll">
                        <!-- add a configuration per non-Angular endpoint -->
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                        <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
                        <add input="{REQUEST_URI}" pattern="^/(api)" negate="true" />
                        <add input="{REQUEST_URI}" pattern="^/(channel)" negate="true" />
                        <add input="{REQUEST_URI}" pattern="^/(docs)/([_0-9a-z-]+)/(images)" negate="true" />
                        <add input="{REQUEST_URI}" pattern="^/(docs)/(sprint-reviews)/([_0-9a-z-]+)/(images)" negate="true" />
                        <add input="{REQUEST_URI}" pattern="^/(logs)" negate="true" />
                        <add input="{REQUEST_URI}" pattern="^/(profile-pics)" negate="true" />
                        <add input="{REQUEST_URI}" pattern="^/(swagger)" negate="true" />
                        <add input="{REQUEST_URI}" pattern="^/(sync)" negate="true" />
                    </conditions>
                    <action type="Rewrite" url="/" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>

    <!-- CORS Configuration -->
    <location path="api">
        <system.webServer>
            <httpProtocol>
                <customHeaders>
                    <add name="Acess-Control-Allow-Methods" value="GET, POST, PUT, DELETE, OPTIONS, HEAD" />
                    <add naem="Access-Control-Allow-Headers" value="Content-Type, Accept" />
                </customHeaders>
            </httpProtocol>
            <cors enabled="true" failUnlistedOrigins="true">
                <!-- add a configuration per Angular app -->
                <add origin="http://docs.app.domain.net" allowCredentials="true">
                    <allowHeaders allowAllRequestedHeaders="true" />
                    <allowMethods>
                        <add method="GET" />
                        <add method="HEAD" />
                        <add method="POST" />
                        <add method="PUT" />
                        <add method="DELETE" />
                    </allowMethods>
                    <exposeHeaders>
                        <add header="Content-Disposition" />
                        <add header="Access-Control-Allow-Origin" />
                    </exposeHeaders>
                </add>
                <add origin="http://playground.app.domain.net" allowCredentials="true">
                    <allowHeaders allowAllRequestedHeaders="true" />
                    <allowMethods>
                        <add method="GET" />
                        <add method="HEAD" />
                        <add method="POST" />
                        <add method="PUT" />
                        <add method="DELETE" />
                    </allowMethods>
                    <exposeHeaders>
                        <add header="Content-Disposition" />
                        <add header="Access-Control-Allow-Origin" />
                    </exposeHeaders>
                </add>
            </cors>
        </system.webServer>
    </location>
    ```

3. Save and close the file.

4. After testing, run `C:\backup-config.ps1` to backup the new configuration.

[Previous](./09-azure-pipelines-configuration.md) | [Home](./readme.md)