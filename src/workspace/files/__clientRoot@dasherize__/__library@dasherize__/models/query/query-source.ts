import { HttpClient } from '@angular/common/http';
import { ServerConfig } from '../../config';
import { CoreQuery } from './core-query';
import { SnackerService } from '../../services';

export class QuerySource<T> extends CoreQuery<T> {
  constructor(
    protected http: HttpClient,
    protected snacker: SnackerService,
    private config: ServerConfig,
    private propertyName: string,
    private url: string | null = null,
    private isDescending: boolean = false,
    protected initialPageSize: number = 20,
    public pageSizeOptions: number[] = [5, 10, 20, 50, 100]
  ) {
    super(http, snacker, initialPageSize, pageSizeOptions);

    this.sort = { propertyName, isDescending };

    this.baseUrl = url
      ? `${this.config.api}${url}`
      : null;
  }

  setUrl = (url: string) => this.baseUrl = `${this.config.api}${url}`;
}
