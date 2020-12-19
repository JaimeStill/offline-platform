import {
  Rule,
  apply,
  mergeWith,
  move,
  template,
  url
} from '@angular-devkit/schematics';

import { strings } from '@angular-devkit/core';
import { Schema } from './schema';

export default function (options: Schema): Rule {
  const templateSource = apply(url('./files'), [
    template({
      ...strings,
      ...options
    }),
    move(options.directory || 'server')
  ]);

  return mergeWith(templateSource);
}
