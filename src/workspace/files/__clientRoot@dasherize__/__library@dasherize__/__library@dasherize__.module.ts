import {
  ModuleWithProviders,
  NgModule
} from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { ServerConfig } from './config';
import { Components } from './components';
import { Dialogs } from './dialogs';
import { Directives } from './directives';
import { Pipes } from './pipes';

@NgModule({
  declarations: [
    ...Components,
    ...Dialogs,
    ...Directives,
    ...Pipes
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    ...Components,
    ...Dialogs,
    ...Directives,
    ...Pipes,
    MaterialModule
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
