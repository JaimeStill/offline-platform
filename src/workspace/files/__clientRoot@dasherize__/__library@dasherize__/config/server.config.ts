export class ServerConfig {
  production = false;
  server = 'http://localhost:<%= serverPort %>/';
  api = 'http://localhost:<%= serverPort %>/<%= dasherize(api) %>/';
}
