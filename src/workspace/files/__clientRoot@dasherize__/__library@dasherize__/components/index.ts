import { CoreComponents } from './core';
import { GenericComponents } from './generic';

export const Components = [
  ...CoreComponents,
  ...GenericComponents
];

export * from './core';
export * from './generic';
