import { Route } from '@angular/router';
import { HomeRoute } from './home/home.route';

export const RouteComponents = [
  HomeRoute
];

export const Routes: Route[] = [
  { path: '', component: HomeRoute, pathMatch: 'full' },
  { path: '**', component: HomeRoute },
];
