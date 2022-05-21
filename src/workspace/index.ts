import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  chain,
  mergeWith,
  move,
  noop,
  template,
  url
} from '@angular-devkit/schematics';

import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { strings } from '@angular-devkit/core';
import { Schema } from './schema';
import { spacify } from '../spacify';

function updatePackageJson(options: Schema) {
  return (host: Tree, context: SchematicContext) => {
    if (!options.skipInstall) {
      context.addTask(new NodePackageInstallTask({ packageManager: options.packageManager }));
    }
    return host;
  }
}

export default function (options: Schema): Rule {
  const templateSource = apply(url('./files'), [
    template({
      ...strings,
      ...options,
      spacify
    }),
    options.skipDirectory
      ? noop
      : options.directory
        ? move(options.directory)
        : move(options.name)
  ]);

  return chain([
    mergeWith(templateSource),
    updatePackageJson(options)
  ]);
}

