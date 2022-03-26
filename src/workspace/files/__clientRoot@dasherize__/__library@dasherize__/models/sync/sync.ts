export type SyncType =
  'default';

export interface Sync {
  id: number;
  isOrigin: boolean;
  isRemoved: boolean;
  type: SyncType;
}
