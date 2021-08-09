import { Route } from '@angular/router';

import {
  HomeComponents,
  HomeRoutes
} from './home';

export const RouteComponents = [
  ...HomeComponents
];

export const Routes: Route[] = [
  ...HomeRoutes,
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
