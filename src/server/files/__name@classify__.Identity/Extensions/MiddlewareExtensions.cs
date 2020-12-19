using <%= classify(name) %>.Identity;

namespace Microsoft.AspNetCore.Builder
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseAdMiddleware(this IApplicationBuilder builder) =>
            builder.UseMiddleware<AdUserMiddleware>();
    }
}
