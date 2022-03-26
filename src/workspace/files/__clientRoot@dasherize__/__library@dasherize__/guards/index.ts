/*
Add export * from './guards' to '../index.ts'
when adding first route guard.
*/

/* Example Guards
import { Injectable } from '@angular/core';

import {
  CanActivate,
  Router
} from '@angular/router';

import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate = (): Promise<boolean> => new Promise(async (resolve) => {
    const res = await this.auth.validateAdmin();
    !res && this.denyAccess('You must be an app administrator to access this route');
    resolve(res);
  });

  denyAccess = (message: string) => this.router.navigate(['/denied', message]);
}

import { Injectable } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router
} from '@angular/router';

import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate = (route: ActivatedRouteSnapshot): Promise<boolean> => new Promise(async (resolve) => {
    const roles = route.data.roles as string[];
    const res = await this.auth.validateRole(roles);
    !res && this.denyAccess(`You must have one of the following roles to access this route: ${roles.join(', ')}`);
    resolve(res);
  });

  denyAccess = (message: string) => this.router.navigate(['/denied', message]);
}
*/

/* Example Data Guard Route Configuration
export const OrgAdminRoutes: Route[] = [
  {
    path: 'org-admin',
    component: OrgAdminRoute,
    children: SecurityRoutes,
    canActivate: [ RoleGuard ],
    data: { roles: ['Admin'] }
  }
]
*/
