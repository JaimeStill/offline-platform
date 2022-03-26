export class StorageState<T> {
  private root: string;
  private module: string;
  private key: string;

  hasState = false;

  constructor(
    root: string,
    module: string,
    key: string
  ) {
    this.root = root;
    this.module = module;
    this.key = key;

    this.getState();
  }

  private name = (module: string, key: string) => `${this.root}-${module}-${key}`;

  private addLocalItem = (module: string, key: string, value: any) => localStorage.setItem(this.name(module, key), JSON.stringify(value));

  private getLocalItem = (module: string, key: string): T | null => JSON.parse(localStorage.getItem(this.name(module, key))) as T;

  private removeLocalItem = (module: string, key: string) => localStorage.removeItem(this.name(module, key));

  private addSessionItem = (module: string, key: string, value: any) => sessionStorage.setItem(this.name(module, key), JSON.stringify(value));

  private getSessionItem = (module: string, key: string): T | null => JSON.parse(sessionStorage.getItem(this.name(module, key))) as T;

  private removeSessionItem = (module: string, key: string) => sessionStorage.removeItem(this.name(module, key));

  updateState = (value: any, useSession = true) => {
    useSession
      ? this.addSessionItem(this.module, this.key, value)
      : this.addLocalItem(this.module, this.key, value);

    this.hasState = true;
  }

  getState = (useSession = true): T | null => {
    const value = useSession
      ? this.getSessionItem(this.module, this.key)
      : this.getLocalItem(this.module, this.key);

    this.hasState = value
      ? true
      : false;

    return value;
  }

  clearState = (useSession = true) => {
    useSession
      ? this.removeSessionItem(this.module, this.key)
      : this.removeLocalItem(this.module, this.key);

    this.hasState = false;
  }
}
