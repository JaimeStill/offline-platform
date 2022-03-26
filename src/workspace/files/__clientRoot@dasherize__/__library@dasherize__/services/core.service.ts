import { HttpHeaders } from '@angular/common/http';

import {
  Injectable,
  ElementRef
} from '@angular/core';

import {
  combineLatest,
  fromEvent,
  of,
  Observable
} from 'rxjs';

import {
  debounceTime,
  distinctUntilChanged,
  map,
  mergeMap
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  getUploadOptions = (): HttpHeaders => {
    const headers = new HttpHeaders();
    headers.set('Accept', 'application/json');
    headers.delete('Content-Type');
    return headers;
  }

  getTextOptions = (): HttpHeaders => {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'text/plain');
    headers.delete('Pragma');
    return headers;
  }

  urlEncode = (value: string): string => {
    const regex = /[^a-zA-Z0-9-.]/gi;
    let newValue = value.replace(/\s/g, '-').toLowerCase();
    newValue = newValue.replace(regex, '');
    return newValue;
  }

  getDateFormat = () => {
    const date = new Date(Date.now());
    return `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
  }

  /*
    mergeMap:
    combine the value of the property input stream with the stream generated from the validate function
    filter:
    set the valid flag and only pass if the validation succeeded
    map:
    filter out the validation result and provide the key value pair
  */
  generateValidationStream = (input: ElementRef, validate: (prop: string) => Observable<boolean>) =>
    this.generateInputObservable(input)
      .pipe(
        mergeMap(prop => {
          return combineLatest([
            of(prop),
            validate(prop)
          ])
        })
      );

  generateInputObservable = (input: ElementRef): Observable<string> =>
    fromEvent(input.nativeElement, 'keyup')
      .pipe(
        debounceTime(800),
        map((event: any) => event.target.value),
        distinctUntilChanged()
      )

  generateHoverObservable = (element: ElementRef, interval = 500) => {
    const enter$ = fromEvent<MouseEvent>(element.nativeElement, 'mouseenter');
    const leave$ = fromEvent<MouseEvent>(element.nativeElement, 'mouseleave')
      .pipe(
        debounceTime(interval)
      );

    return combineLatest([enter$, leave$])
      .pipe(
        map((events: [MouseEvent, MouseEvent]) => events[0].timeStamp > events[1].timeStamp
          ? true
          : false
        )
      );
  }
}
