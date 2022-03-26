import {
  Injectable,
  Optional
} from '@angular/core';

import {
  BehaviorSubject,
  Observable,
  combineLatest
} from 'rxjs';

import {
  filter,
  map
} from 'rxjs/operators';

import {
  HubConnection,
  HubConnectionBuilder
} from '@microsoft/signalr';

import {
  SocketState,
  Sync,
  SyncType
} from '../models';

import { ServerConfig } from '../config';
import { SnackerService } from '../services/snacker.service';
import { SyncService } from '../services/sync.service';

@Injectable({
  providedIn: 'root'
})
export class SyncSocket {
  private endpoint = 'http://localhost:5000/sync';
  private connection: HubConnection;

  private connected = new BehaviorSubject<boolean | null>(null);
  private error = new BehaviorSubject<any>(null);

  state$: Observable<SocketState> = combineLatest([
    this.connected.asObservable(),
    this.error.asObservable()
  ])
  .pipe(
    map(data => Object.assign({} as SocketState, ...data)),
    filter((data: SocketState) => data.connected !== null)
  );

  private identity = new BehaviorSubject<boolean | null>(null);
  private notify = new BehaviorSubject<boolean | null>(null);

  identity$ = this.identity.asObservable();
  notify$ = this.notify.asObservable();

  constructor(
    private snacker: SnackerService,
    private syncSvc: SyncService,
    @Optional() config?: ServerConfig
  ) {
    if (config) { this.endpoint = `${config.server}sync`; }

    this.connection = new HubConnectionBuilder()
      .withUrl(this.endpoint, {
        withCredentials: true
      })
      .build();

    this.connection.on(
      'sync',
      (sync: Sync) => {
        switch (sync.type) {
          case 'default':
          default:
            this.syncSvc.base.next(sync);
            break;
        }
      }
    );

    this.connection.on(
      'identity',
      (message?: string) => {
        message && this.snacker.sendColorMessage(message, ['snacker-orange']);
        this.identity.next(true);
      }
    )

    this.connection.on(
      'notify',
      (message?: string) => {
        message && this.snacker.sendColorMessage(message, ['snacker-indigo']);
        this.notify.next(true);
      }
    )

    this.connection
      .start()
      .then(() => this.connected.next(true))
      .catch((err: any) => {
        this.connected.next(false);
        this.error.next(err);
        this.snacker.sendErrorMessage(err.error);
      });
  }

  triggerSync = async <T extends Sync>(sync: T) => {
    if (this.connected.value) {
      await this.connection
        .invoke(
          this.getSyncEndpoint(sync.type),
          Object.assign(sync,{ isOrigin: false } as Sync)
        );
    }
  }

  triggerIdentity = async (user: string, message?: string) => {
    if (this.connected.value) {
      await this.connection
        .invoke('triggerIdentity', user, message);
    }
  }

  triggerNotify = async (user: string, message?: string) => {
    if (this.connected.value) {
      await this.connection
        .invoke('triggerNotify', user, message);
    }
  }

  private getSyncEndpoint = (t: SyncType): string => {
    switch (t) {
      case 'default':
      default:
        return 'triggerSync';
    }
  }
}
