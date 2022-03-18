namespace Microsoft.AspNetCore.Builder;

using <%= classify(name) %>.Identity.Mock;

public static class MiddlewareExtensions
{
    public static IApplicationBuilder UseMockMiddleware(this IApplicationBuilder builder) => builder.UseMiddleware<MockMiddleware>();
}