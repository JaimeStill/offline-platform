# Schematics Notes

## Create a Schematic

```bash
schematics blank --name={name}
```

## Build Schematic

```bash
cd {name}
npm i
npm run build
```

## Run a Schematic

```bash
# if located in workspace root
schematics .:{schematics-name} --{required-option}={value} --debug=false

# example
schematics .:platform demo --serverName=Demo --debug=false

# if not located in workspace root
schematics {relative-path-to-collection.json}:{schematics-name} --debug=false

# example
schematics ../../collection.json:platform demo --serverName=Demo --debug=false
```

## Add Schematic to a Collection

```bash
cd {schematic-project-root}

schematics blank --name={new-schematic-name}
```

## Clear NuGet Caches

```bash
dotnet nuget locals global-packages --clear
dotnet nuget locals http-cache --clear
```

## Update `dotnet-ef`

```bash
dotnet tool update --global dotnet-ef
```

## Clear node Caches

```bash
npm cache clean --force
```

## Angular Resources

* [NgModule FAQ](https://angular.io/guide/ngmodule-faq)
* [NgModule API](https://angular.io/guide/ngmodule-api)
* [Angular CLI](https://angular.io/cli)
* [Project File Structure - Workspace and Project File Structure](https://angular.io/guide/file-structure#workspace-and-project-file-structure)
* [Project File Structure - Multiple Projects](https://angular.io/guide/file-structure#multiple-projects)
* [Project File Structure - Library Project Files](https://angular.io/guide/file-structure#library-project-files)
* [Angular Libraries - Creating Libraries](https://angular.io/guide/creating-libraries)
* [ng new](https://angular.io/cli/new)
* [ng generate library](https://angular.io/cli/generate#library)
* [Workspace - Multiple Projects](https://angular.io/guide/file-structure#multiple-projects)
* [Library Project Files](https://angular.io/guide/file-structure#library-project-files)
* [Angular Libraries - Creating Libraries](https://angular.io/guide/creating-libraries)

