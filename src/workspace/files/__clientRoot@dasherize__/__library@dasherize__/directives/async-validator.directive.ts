import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import {
  CoreService,
  SnackerService
} from '../services';

import { HttpClient } from '@angular/common/http';
import { ServerConfig } from '../config';

@Directive({
  selector: '[async-validator]'
})
export class AsyncValidatorDirective<T> implements OnInit {
  private valid: boolean | null = null;

  @Input() data: T;
  @Input() url: string;
  @Output() validate = new EventEmitter<boolean | null>();

  constructor(
    private config: ServerConfig,
    private core: CoreService,
    private http: HttpClient,
    private snacker: SnackerService,
    public el: ElementRef,
  ) { }

  ngOnInit() {
    this.core.generateInputObservable(this.el)
      .subscribe(async (val: string) => {
        if (val?.length > 0)
          this.validate.emit(await this.verify());
        else
          this.validate.emit(null);
      });
  }

  verify = (): Promise<boolean> => new Promise((resolve) => {
    this.http.post<boolean>(`${this.config.api}${this.url}`, this.data)
      .subscribe({
        next: data => resolve(data),
        error: err => {
          this.snacker.sendErrorMessage(err.error);
          resolve(false);
        }
      })
  });
}
