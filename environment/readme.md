# Offline Environment Configuration

This documentation is intended to be followed sequentially. Steps that are performed in a document could potentially rely on steps that were taken in a previous document. If you run into any problems, be sure you performed any related tasks defined in earlier sections.

The names of servers, applications, URLs, etc. have been made generic to simplify the writing of this documentation. Be sure to adjust these names to match your target environment.

This guide is very specific to a Windows domain based on-prem environment with adminstrative access to specific types of servers. Ensure you have proper access and authority to your environment before making changes to it. That said, a lot of the concepts in this guide can still be helpful when planning your own app deployment using a similar .NET / Angular monorepo in a similar environment.

Table of Contents
1. [Requirements](./01-requirements.md)
2. [Service Account Configuration](./02-service-account-configuration.md)
3. [DNS and Group Policy Configuration](./03-dns-and-group-policy-configuration.md)
4. [SQL Server Configuration](./04-sql-server-configuration.md)
5. [Build Server Configuration](./05-build-server-configuration.md)
6. [IIS Server Configuration](./06-iis-server-configuration.md)
7. [DevOps Configuration](./07-devops-configuration.md)
8. [Dev Machine Configuration](./08-dev-machine-configuration.md)
9. [Azure Pipelines Configuration](./09-azure-pipelines-configuration.md)
10. [URL Rewrite and CORS Configuration](./10-url-rewrite-and-cors-configuration.md)