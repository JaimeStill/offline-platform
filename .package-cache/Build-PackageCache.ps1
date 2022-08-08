param(
    [string]
    [Parameter()]
    $Cache = "nuget-packages",
    [string]
    [Parameter()]
    $Source = "solution.json",
    [switch]
    [Parameter()]
    $KeepSolution,
    [switch]
    [Parameter()]
    $SkipClean
)

. .\functions.ps1

$data = Get-Content -Raw -Path $Source | ConvertFrom-Json

$sln = "src/BuildCache"
if (Test-Path $sln) {
    Remove-Item $sln -Recurse -Force
}

Build-Solution $data $sln

if (-not $SkipClean) {
    & dotnet nuget locals all --clear
}

Build-Cache $Cache $sln

if (-not $KeepSolution) {
    Remove-Item "src" -Recurse -Force
}
