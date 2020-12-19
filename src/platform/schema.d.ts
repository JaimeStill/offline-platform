export interface GitCommit {
  name: string;
  email: string;
  message: string;
}

export interface Schema {
  api: string;
  appName: string;
  appPort: number;
  clientRoot: string;
  commit: GitCommit | boolean;
  directory: string;
  library: string;
  linkCli: boolean;
  name: string;
  packageManager: string;
  prefix: string;
  serverName: string;
  serverPort: number;
  serverRoot: string;
  skipApp: boolean;
  skipGit: boolean;
  skipInstall: boolean;
}
