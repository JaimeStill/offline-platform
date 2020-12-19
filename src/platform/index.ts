import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
  apply,
  chain,
  empty,
  mergeWith,
  move,
  noop,
  schematic
} from '@angular-devkit/schematics';

import {
  NodePackageInstallTask,
  NodePackageLinkTask,
  RepositoryInitializerTask
} from '@angular-devkit/schematics/tasks';

import { Schema as ApplicationOptions } from '../app/schema';
import { Schema as DocsOptions } from '../docs/schema';
import { Schema as ServerOptions } from '../server/schema';
import { validateProjectName } from '@schematics/angular/utility/validation';
import { Schema as WorkspaceOptions } from '../workspace/schema';
import { Schema as PlatformOptions } from './schema';

export default function(options: PlatformOptions): Rule {
  if (!options.name) {
    throw new SchematicsException(`Invalid options, "name" is required.`);
  }

  validateProjectName(options.name);

  if (!options.directory) {
    options.directory = options.name;
  }

  const workspaceOptions: WorkspaceOptions = {
    api: options.api,
    name: options.name,
    directory: undefined,
    clientRoot: options.clientRoot,
    library: options.library,
    packageManager: options.packageManager,
    server: options.serverName,
    serverPort: options.serverPort,
    serverRoot: options.serverRoot,
    skipDirectory: true,
    skipInstall: options.skipInstall
  };

  const serverOptions: ServerOptions = {
    name: options.serverName,
    directory: options.serverRoot,
    port: options.serverPort
  };

  const applicationOptions: ApplicationOptions = {
    projectRoot: '',
    api: options.api,
    library: options.library,
    name: options.appName ? options.appName : options.name,
    port: options.appPort,
    prefix: options.prefix,
    serverPort: options.serverPort,
    skipInstall: options.skipInstall
  };

  const docsOptions: DocsOptions = {
    projectRoot: '',
    api: options.api,
    library: options.library,
    name: 'docs',
    port: 4000,
    serverPort: 5000,
    skipInstall: options.skipInstall
  };

  return chain([
    mergeWith(
      apply(empty(), [
        schematic('workspace', workspaceOptions),
        schematic('server', serverOptions),
        schematic('docs', docsOptions),
        options.skipApp ? noop : schematic('app', applicationOptions),
        options.directory ? move(options.directory) : noop,
      ])
    ),
    (_host: Tree, context: SchematicContext) => {
      let packageTask;

      if (!options.skipInstall) {
        packageTask = context.addTask(
          new NodePackageInstallTask({
            workingDirectory: options.directory,
            packageManager: options.packageManager
          })
        );

        if (options.linkCli) {
          packageTask = context.addTask(
            new NodePackageLinkTask('@angular/cli', options.directory),
            [packageTask]
          );
        }
      }

      if (!options.skipGit) {
        const commit = typeof options.commit === 'object'
          ? options.commit
          : (!!options.commit ? {} : false);

        context.addTask(
          new RepositoryInitializerTask(
            options.directory,
            commit
          ),
          packageTask ? [packageTask] : []
        );
      }
    }
  ]);
}
