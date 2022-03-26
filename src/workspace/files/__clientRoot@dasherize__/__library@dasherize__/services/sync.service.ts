import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Sync } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  base = new BehaviorSubject<Sync>(null);
}
