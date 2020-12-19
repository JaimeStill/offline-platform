# Schematics Notes

This section is for my own awareness. It has no bearing on working with this repository.

## Create a Schematic

```bash
schematics blank --name={name}
```

## Build Schematic

```bash
cd {name}
yarn install
yarn build
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
