namespace Microsoft.AspNetCore.Builder;

using <%= classify(name) %>.Identity;

public static class MiddlewareExtensions
{
    public static IApplicationBuilder UseAdMiddleware(this IApplicationBuilder builder) =>
        builder.UseMiddleware<AdUserMiddleware>();
}