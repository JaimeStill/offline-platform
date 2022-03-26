import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuerySource } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GarbageService {
  private subscriptions = new Array<Subscription>();
  private sources = new Array<QuerySource<any>>();

  registerSubs = (...subs: Subscription[]) => this.subscriptions.push(...subs);
  registerSources = (...sources: QuerySource<any>[]) => this.sources.push(...sources);

  clean = () => {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = new Array<Subscription>();

    this.sources.forEach(source => source.unsubscribe());
    this.sources = new Array<QuerySource<any>>();
  }
}
