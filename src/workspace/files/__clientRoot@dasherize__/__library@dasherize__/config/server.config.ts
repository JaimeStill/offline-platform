export class ServerConfig {
  server = 'http://localhost:<%= serverPort %>/';
  api = 'http://localhost:<%= serverPort %>/<%= dasherize(api) %>/';
}
