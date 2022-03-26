import { strings } from '@angular-devkit/core';

export function spacify (str: string): string {
  return strings.dasherize(str)
    .split('-')
    .map((part) => strings.capitalize(part))
    .join(' ');
}
