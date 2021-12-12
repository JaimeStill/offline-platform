import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SnackerService } from './snacker.service';
import { ServerConfig } from '../config';
import { QuerySource } from '../models';

@Injectable({
  providedIn: 'root'
})
export class QueryGeneratorService {
  constructor(
    private config: ServerConfig,
    private http: HttpClient,
    private snacker: SnackerService
  ) { }

  generateSource = <T>(
    propertyName: string,
    url: string | null = null,
    isDescending: boolean = false
  ) => new QuerySource<T>(
    this.http,
    this.snacker,
    this.config,
    propertyName,
    url,
    isDescending
  );
}
