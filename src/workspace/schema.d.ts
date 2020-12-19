export interface Schema {
  api: string;
  clientRoot: string;
  directory?: string;
  library: string;
  name: string;
  packageManager: string;
  server: string;
  serverPort: number;
  serverRoot: string;
  skipDirectory: boolean;
  skipInstall: boolean;
}
