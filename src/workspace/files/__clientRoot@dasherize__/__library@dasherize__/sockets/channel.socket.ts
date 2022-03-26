import {
  Injectable,
  Optional
} from '@angular/core';

import {
  HubConnection,
  HubConnectionBuilder
} from '@microsoft/signalr';

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
export class ChannelSocket {
  private endpoint = 'http://localhost:5000/channel';
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

  constructor(
    private snacker: SnackerService,
    private sync: SyncService,
    @Optional() config?: ServerConfig
  ) {
    if (config)
      this.endpoint = `${config.server}channel`;

    this.connection = new HubConnectionBuilder()
      .withUrl(this.endpoint, {
        withCredentials: true
      })
      .build();

    this.connection.on(
      'channel',
      (message: string) => this.snacker.sendColorMessage(message, ['snacker-indigo'])
    );

    this.connection.on(
      'sync',
      (sync: Sync) => {
        switch (sync.type) {
          case 'default':
          default:
            this.sync.base.next(sync);
            break;
        }
      }
    );

    this.connection
      .start()
      .then(() => this.connected.next(true))
      .catch((err: any) => {
        this.connected.next(false);
        this.error.next(err);
        this.snacker.sendErrorMessage(err.error);
      });
  }

  triggerJoin = async (group: string) => {
    if (this.connected.value) {
      await this.connection
        .invoke('triggerJoin', group);
    }
  }

  triggerLeave = async (group: string) => {
    if (this.connected.value) {
      await this.connection
        .invoke('triggerLeave', group);
    }
  }

  triggerSync = async <T extends Sync>(group: string, sync: T)=> {
    if (this.connected.value) {
      await this.connection
        .invoke(
          this.getSyncEndpoint(sync.type),
          group,
          Object.assign(sync, { isOrigin: false } as Sync)
        );
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
