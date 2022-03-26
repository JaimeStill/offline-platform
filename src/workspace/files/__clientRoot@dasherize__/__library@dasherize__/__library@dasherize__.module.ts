import {
  ModuleWithProviders,
  NgModule
} from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { ServerConfig } from './config';
import { Components } from './components';
import { Dialogs } from './dialogs';
import { Directives } from './directives';
import { Forms } from './forms';
import { Pipes } from './pipes';
import { AuthInterceptor } from './services';

@NgModule({
  declarations: [
    ...Components,
    ...Dialogs,
    ...Directives,
    ...Forms,
    ...Pipes
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    ...Components,
    ...Dialogs,
    ...Directives,
    ...Forms,
    ...Pipes,
    MaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class <%= classify(library) %>Module {
  static forRoot(config: ServerConfig): ModuleWithProviders<<%= classify(library) %>Module> {
    return {
      ngModule: <%= classify(library) %>Module,
      providers: [
        { provide: ServerConfig, useValue: config }
      ]
    };
  }
}
