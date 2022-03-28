# DevOps Configuration

## IIS Web App Deployment Extension

1. Navigate to the [IIS Web App Deployment Extension Page](https://marketplace.visualstudio.com/items?itemName=ms-vscs-rm.iiswebapp) and click **Get It Free**.

2. Log in to a Microsoft account.

3. In the corresponding page, at the bottom where it says *For Azure DevOps Server*, click **Download** and save the resulting `.vsix` file.

4. Navigate to your Azure DevOps Server Gallery Management URL, http://devazure.domain.net/_gallery/manage for this documentation.

5. Click **Upload Extension** and select the downloaded `.vsix`.

## Service Account Permissions

1. Remote into the Azure DevOps Server, `DEVAZURE` for this documentation`, and launch **Azure DevOps Server Administration Console**.

2. Click **Application Tier** in the sidebar, then click **Group Membership**.

3. Click **[Team Foundation]\Team Foundation Administrators**, then click **Properties**.

4. Make sure to select **Windows User or Group**, then click **Add...**

5. Type `svc-app-tfs`, click **Check Names**, then click **OK** to add to the group.

## Agent Pool Configuration

1. Navigate to the Collection URL, http://devazure.domain.net/Projects for this documentation, and click **Collection Settings** at the bottom left in the sidebar.

2. Under the **Pipelines** section in the sidebar, click the **Agent pools** link.

3. Click the **New agent pool...** link, uncheck the *Auto-provision corresponding agent pools in all projects* option, and provide the name `build-agent`.

4. Select the agent, click the **Roles** tab, and click the **Add** button.

5. Type the name `svc-app-tfs` and select the identity that is resolved, change the **Role** to **Administrator** and click **Add**.

6. Navigate to your project repository, http://devazure.domain.net/Projects/app for this documentation, and click **Project Settings** at the bottom left in the sidebar.

7. Under the **Pipelines** section in the **Project Settings** sidebar, click the **Agent pools** link.

8. Click the **Add pool** button, select the **Existing** radio button, select `build-agent` form the dropdown, then click **Create**.

9. Click into the `build-agent` agent pool, click the **Security** tab, then click **Add**.

10. Provide the name `svc-app-tfs` and set **Role** to **Adminstrator**, then click **Add**.

## Deployment Pool Configuration

1. Navigate to the Collection URL, http://devazure.domain.net/Projects for this documentation, and click **Collection Settings** at the bottom left in the sidebar.

2. Under the **Pipelines** section in the sidebar, click the **Deployment pools** link.

3. Click the **New** button, provide the name `iis-pool` and click **Create**.

4. After the deployment pool is created, it will be selected. Click the **Security** button, click the **Add** button in the dialog that opens, provide the name `svc-app-tfs` and select the resolved identity, change **Role** to **Administrator** and click **Add**.

5. Navigate to your project repository, http://devazure.domain.net/Projects/app for this documentation, hover over the **Pipelines** section in the sidebar, and click the **Deployment groups** link.

6. Click the **Available pools** tab, then click the `+` icon on the `iis-pool` Deployment Pool row.

7. Change the **Deployment group name** to `app-iis` and click **Create**.

8. After the deployment group is created, it will be selected. Click the **Security** button, click the **Add** button in the dialog that opens, provide the name `svc-app-tfs` and select the resolved identity, change **Role** to **Administrator** and click **Add**.

## Azure Pipelines Agent for Offline Environment

1. Download the latest [azure-pipelines-agent](https://github.com/microsoft/azure-pipelines-agent/releases) release.

2. Unzip the directory and add the following files:

**notes.txt**
> This is purely to serve as a reminder for arguments to the PowerShell scripts that follow.

```txt
-depGroup='app-iis'
-project='app'
```

**remove.ps1**

```pwsh
.\config.cmd remove --auth 'negotiate'
```

**config-build.ps1**

```PowerShell
param(
    [Parameter()]
    [string]$pool = 'build-agent',
    [Parameter()]
    [string]$agent = $env:COMPUTERNAME,
    [Parameter()]
    # change to relevant Azure DevOps URL
    [string]$url = 'http://devazure.domain.net',
    [Parameter()]
    [string]$work = '_work',
    [Parameter()]
    [string]$auth = 'negotiate'
)

.\config.cmd --pool $pool `
             --agent $agent `
             --runasservice `
             --work $work `
             --url $url `
             --auth $auth
```

**config-deployment.ps1**

```PowerShell
param(
    [Parameter(Mandatory)]
    [string]$depGroup,
    [Parameter(Mandatory)]
    [string]$project,
    [Parameter()]
    [string]$work = '_work',
    [Parameter()]
    # change to relevant Azure DevOps URL
    [string]$url = 'http://devazure.domain.net',
    [Parameter()]
    # change to relevant Azure DevOps Collection
    [string]$collection = 'Projects',
    [Parameter()]
    [string]$auth = 'negotiate'
)

.\config.cmd --deploymentgroup `
             --deploymentgroupname $depGroup `
             --agent $env:COMPUTERNAME `
             --runasservice `
             --work $work `
             --url $url `
             --collectionname $collection `
             --projectname $project `
             --auth $auth
```

3. Rename the directory to `DevOpsAgent` and keep on hand for [Build Agent](#configure-build-agent) + [Deployment Agent](#configure-deployment-agent) configuration.

## Configure Build Agent

1. Remote into the Build Server, `DEVBUILD` for this documentation.

2. Copy the `DevOpsAgent` directory created [above](#azure-pipelines-agent-for-offline-environment) to `C:\` and rename it to `_BuildAgent`.

3. Open an administrative PowerShell session and change directory to ` C:\_BuildAgent`.

4. Run `.\config-build.ps1` and supply the following inputs:

    * Enter user name > `svc-app-tfs`
    * Enter password > `{password}`
    * Enter User account to use for the service (press enter for NT Authority/Network Service)> `svc-app-tfs@domain.net`
    * Enter Password for the account `svc-app-tfs@domain.net`> `{password}`

> If you ever need to remove the build agent, open an administrative PowerShell session, change directory to `C:\_BuildAgent` and run `.\remove.ps1`. When promted for a user and password, provide the following:
>
> **User**: `svc-app-tfs`  
> **Password**: `{password}`

## Configure Deployment Agent

1. Remote into the IIS Server, `DEVIIS` for this documentation.

2. Copy the `DevOpsAgent` directory created [above](#azure-pipelines-agent-for-offline-environment) to `C:\` and rename it to `_DeploymentAgent`.

3. Open an administrative PowerShell session and change directory to `C:\DeploymentAgent`.

4. Run `.\config-deployment.ps1 -depGroup 'app-iis' -project 'app'` and supply the following inputs:

    * Enter user name > `svc-app-tfs`
    * Enter password > `{password}`
    * Enter deployment group tags for agent? (Y/N) (press enter for N) > `N`
    * Enter User accoutn to use for the service (press enter for NT Authority\SYSTEM) > `svc-app-tfs@domain.net`
    * Enter Password for the account `svc-app-tfs@domain.net`> `{password}`

> If you ever need to remove the deployment agent, open an administrative PowerShell session, change directory to `C:\_DeploymentAgent` and run `.\remove.ps1`. When prompted for a user and password, provide the following:
>
> **User**: svc-app-tfs  
> **Password**: {password}