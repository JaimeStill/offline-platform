import { Tree } from '@angular-devkit/schematics';
import { JSONFile } from '@schematics/angular/utility/json-file';
const PKG_JSON_PATH = '/package.json';

export function addPackageJsonScript(tree: Tree, name: string, script: string, pkgJsonPath = PKG_JSON_PATH): void {
  const json = new JSONFile(tree, pkgJsonPath);
  const path = ["scripts", name];
  json.modify(path, script);
}
