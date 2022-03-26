import {
  Injectable,
  Optional
} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { GarbageService } from './garbage.service';
import { SnackerService } from './snacker.service';
import { ServerConfig } from '../config';
import { QuerySource } from '../models';

@Injectable({
  providedIn: 'root'
})
export class QueryGeneratorService {
  private size: number;

  constructor(
    @Optional() private config: ServerConfig,
    private garbage: GarbageService,
    private http: HttpClient,
    private snacker: SnackerService
  ) {
    this.garbage.registerSubs(
      /* Example of user default page size
      this.identity.currentUser$.subscribe(user =>
        this.size = user
          ? user.defaultPageSize
          : this.size
      )
      */
    );
  }

  generateSource = <T>(
    propertyName: string,
    url: string = null,
    isDescending: boolean = false,
    pageSize: number = this.size,
    pageSizeOptions: number[] = [5, 10, 20, 50, 100]
  ) => new QuerySource<T>(
    this.http,
    this.snacker,
    this.config,
    propertyName,
    url,
    isDescending,
    pageSize,
    pageSizeOptions
  );
}
