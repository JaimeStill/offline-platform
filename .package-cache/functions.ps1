function Add-ProjectDependency([psobject] $dependency, [string] $output) {
    if ($_.Contains('@')) {
        $split = $_.Split('@');
        $dependency = $split[0];
        $version = $split[1];

        & dotnet add $output package $dependency --version $version
    } else {
        & dotnet add $output package $_
    }
}

function Build-Project([psobject] $project, [string] $sln, [string] $framework) {
    $output = Join-Path $sln $project.name

    & dotnet new $project.template -o $output -f $framework
    & dotnet sln $sln add $output

    $project.dependencies | ForEach-Object {
        Add-ProjectDependency $_ $output
    }
}

function Build-Solution([psobject] $data, [string] $sln, [string] $framework) {
    & dotnet new sln -o $sln

    $data | ForEach-Object {
        Build-Project $_ $sln $framework
    }
}

function Build-Cache([string] $cache, [string] $sln) {
    if (-not (Test-Path $cache)) {
        New-Item -Path $cache -ItemType Directory -Force
    }

    & dotnet restore $sln --packages $cache
}
