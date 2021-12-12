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
    private isDescending: boolean = false
  ) {
    super(http, snacker);

    this.sort = { propertyName, isDescending };

    this.baseUrl = url
      ? `${this.config.api}${url}`
      : null;
  }

  setUrl = (url: string) => this.baseUrl = `${this.config.api}/${url}`;
}
