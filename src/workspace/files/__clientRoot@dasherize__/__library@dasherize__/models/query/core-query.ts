import {
  ReplaySubject,
  Subject,
  Subscription,
  merge,
  throwError
} from 'rxjs';

import {
  catchError,
  debounceTime,
  filter,
  switchMap
} from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { QueryResult } from './query-result';
import { SnackerService } from '../../services';

export abstract class CoreQuery<T> {
  private requestUrl = new Subject<string>();
  private forceRefreshUrl = new Subject<string>();

  protected queryResult = new ReplaySubject<QueryResult<T>>(1);
  protected lastQueryResult!: QueryResult<T>;
  protected subs = new Array<Subscription>();

  queryResult$ = this.queryResult.asObservable();

  private initUrlStream = (): Subscription =>
    merge(this.requestUrl, this.forceRefreshUrl)
      .pipe(
        debounceTime(0),
        switchMap((url: string) =>
          this.http.get<QueryResult<T>>(url).pipe(
            catchError(er => throwError(() => new Error(er)))
          )
        ),
        filter(r => r != null)
      )
      .subscribe({
        next: result => {
          this.lastQueryResult = result;
          this.queryResult.next(result);
        },
        error: err => this.snacker.sendErrorMessage(err.error)
      });

  constructor(
    protected http: HttpClient,
    protected snacker: SnackerService,
    protected initialPageSize: number = 20,
    public pageSizeOptions: number[] = [5, 10, 20, 50, 100]
  ) {
    this.subs.push(
      this.initUrlStream()
    )

    this.pageSize = initialPageSize;
  }

  unsubscribe = () => this.subs.forEach(sub => sub.unsubscribe());

  private _baseUrl: string = null;
  get baseUrl(): string { return this._baseUrl; }
  protected set baseUrl(value: string) {
    if (value !== this._baseUrl) {
      this._baseUrl = value;
      this.refresh();
    }
  }

  private _page = 1;
  get page(): number { return this._page; }
  set page(value: number) {
    if (value !== this._page) {
      this._page = value;
      this.refresh();
    }
  }

  private _pageSize: number;
  get pageSize(): number { return this._pageSize; }
  set pageSize(value: number) {
    if (this._pageSize) {
      if (value !== this._pageSize) {
        this._pageSize = value;
        this.refresh();
      }
    } else {
      this._pageSize = value;
    }
  }

  private _sort: { propertyName: string, isDescending: boolean } | null = null;
  get sort(): { propertyName: string, isDescending: boolean } | null {
    return this._sort;
  }
  set sort(value: { propertyName: string, isDescending: boolean }) {
    this._sort = value;
    this.refresh();
  }

  private _search: string | null = null;
  get search(): string | null {
    return this._search;
  }
  set search(value: string) {
    this._search = value;
    this.refresh();
  }

  private _additionalQueryParams: { [parameter: string]: string } = {};
  setQueryParameter(name: string, value: string) {
    this._additionalQueryParams[name] = value;
    this.refresh();
  }
  getQueryParameter(parameterName: string): string | null {
    return this._additionalQueryParams[parameterName] || null;
  }

  private refresh = () => {
    if (!this.baseUrl) return;

    const url = this.buildUrl();
    this.requestUrl.next(url);
  }

  private buildUrl = () => {
    let url = `${this.baseUrl}?page=${this.page}&pageSize=${this.pageSize}`;

    if (this.sort) {
      const sortParam = `sort=${this.sort.propertyName}_${this.sort.isDescending ? 'desc' : 'asc'}`;
      url += `&${sortParam}`;
    }

    if (this.search) {
      const searchParam = `search=${this.search}`;
      url += `&${searchParam}`;
    }

    for (const name in this._additionalQueryParams) {
      if (this._additionalQueryParams.hasOwnProperty(name)) {
        const value = this._additionalQueryParams[name];

        if (value) {
          url += `&${name}=${value}`;
        }
      }
    }

    return url;
  }

  forceRefresh = () => {
    const url = this.buildUrl();
    this.forceRefreshUrl.next(url);
  }

  clearStream = () => this.baseUrl = null && this.queryResult.next(null);

  clearSearch = () => this.search = null;

  onPage = (pageEvent: PageEvent) => {
    this.page = pageEvent.pageIndex + 1;
    this.pageSize = pageEvent.pageSize;
  }

  onSearch = (event: string) => this.search = event;

  onSort = (event: { active: string, direction: string }) => this.sort = event.direction
    ? { propertyName: event.active, isDescending: event.direction === 'desc' }
    : null;
}
