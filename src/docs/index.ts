import {
  JsonObject,
  join,
  normalize,
  strings
} from '@angular-devkit/core';

import {
  MergeStrategy,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
  apply,
  chain,
  mergeWith,
  move,
  template,
  url
} from '@angular-devkit/schematics';

import {
  getWorkspace,
  updateWorkspace
} from '@schematics/angular/utility/workspace';

import {
  Builders,
  ProjectType
} from '@schematics/angular/utility/workspace-models';

import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { relativePathToWorkspaceRoot } from '@schematics/angular/utility/paths';
import { addPackageJsonScript } from '../dependencies';

import { Schema } from './schema';
import { spacify } from '../spacify';

function updatePackageJson(options: Schema, appDir: string) {
  return (host: Tree, context: SchematicContext) => {
    addPackageJsonScript(host, `e2e-run-${strings.dasherize(options.name)}`, `cypress run --project ${appDir}`);
    addPackageJsonScript(host, `start-${options.name}`, `ng serve ${options.name} --configuration development`);

    if (!options.skipInstall) {
      context.addTask(new NodePackageInstallTask({ packageManager: 'npm' }));
    }

    return host;
  };
}

function addAppToWorkspaceFile(options: Schema, appDir: string): Rule {
  let projectRoot = appDir;

  if (projectRoot) {
    projectRoot += '/';
  }

  const schematics: JsonObject = {};

  const componentSchematicsOptions: JsonObject = {};
  componentSchematicsOptions.inlineTemplate = false;
  componentSchematicsOptions.inlineStyle = false;
  componentSchematicsOptions.style = 'scss';
  componentSchematicsOptions.skipTests = true;

  schematics['@schematics/angular:component'] = componentSchematicsOptions;

  ['class', 'directive', 'guard', 'interceptor', 'module', 'pipe', 'service', 'application'].forEach((type) => {
    if (!(`@schematics/angular:${type}` in schematics)) {
      schematics[`@schematics/angular:${type}`] = {};
    }
    (schematics[`@schematics/angular:${type}`] as JsonObject).skipTests = true;
  });

  const sourceRoot = join(normalize(projectRoot), 'src');

  let budgets = [
    {
      type: 'initial',
      maximumWarning: '2mb',
      maximumError: '5mb'
    },
    {
      type: 'anyComponentStyle',
      maximumWarning: '6kb',
      maximumError: '10kb'
    }
  ];

  const project = {
    root: normalize(projectRoot),
    sourceRoot,
    projectType: ProjectType.Application,
    prefix: 'app',
    schematics,
    targets: {
      build: {
        builder: Builders.Browser,
        options: {
          "allowedCommonJsDependencies": [
            "prismjs"
          ],
          outputPath: `dist/${options.name}`,
          index: `${sourceRoot}/index.html`,
          main: `${sourceRoot}/main.ts`,
          polyfills: `${sourceRoot}/polyfills.ts`,
          tsConfig: `${projectRoot}tsconfig.app.json`,
          assets: [
            `${sourceRoot}/favicon.ico`,
            `${sourceRoot}/assets`,
            {
              "glob": "**/*",
              "input": "./assets",
              "output": `${sourceRoot}/assets`
            }
          ],
          "styles": [
            "theme/theme.scss"
          ],
          "scripts": [
            "node_modules/hammerjs/hammer.js"
          ]
        },
        configurations: {
          production: {
            budgets,
            fileReplacements: [{
              replace: `${sourceRoot}/environments/environment.ts`,
              with: `${sourceRoot}/environments/environment.prod.ts`
            }],
            outputHashing: 'all'
          },
          development: {
            buildOptimizer: false,
            optimization: false,
            vendorChunk: true,
            extractLicenses: false,
            sourceMap: true,
            namedChunks: true
          }
        },
        defaultConfiguration: "production"
      },
      serve: {
        builder: Builders.DevServer,
        options: {
          browserTarget: `${options.name}:build`,
          port: options.port
        },
        configurations: {
          production: {
            browserTarget: `${options.name}:build:production`
          },
          development: {
            browserTarget: `${options.name}:build:development`
          }
        },
        defaultConfiguration: "development"
      },
      'extract-i18n': {
        builder: Builders.ExtractI18n,
        options: {
          browserTarget: `${options.name}:build`
        }
      }
    }
  };

  return updateWorkspace(workspace => {
    if (workspace.projects.size === 0) {
      workspace.extensions.defaultProject = options.name;
    }

    workspace.projects.add({
      name: options.name,
      ...project
    });
  });
}

export default function (options: Schema): Rule {
  return async (host: Tree) => {
    if (!options.name) {
      throw new SchematicsException(`Invalid options, "name" is required.`);
    }

    const workspace = await getWorkspace(host);
    const newProjectRoot = workspace.extensions.newProjectRoot as (string | undefined) || '';
    const appDir = join(normalize(newProjectRoot), options.name);

    return chain([
      addAppToWorkspaceFile(options, appDir),
      mergeWith(
        apply(url('./files'), [
          template({
            ...strings,
            ...options,
            spacify,
            relativePathToWorkspaceRoot: relativePathToWorkspaceRoot(appDir),
            appName: options.name
          }),
          move(appDir)
        ]), MergeStrategy.Overwrite
      ),
      updatePackageJson(options, appDir)
    ]);
  };
}
