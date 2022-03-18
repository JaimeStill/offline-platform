namespace <%= classify(name) %>.Identity;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

public class AdUserMiddleware
{
    private readonly RequestDelegate next;

    public AdUserMiddleware(RequestDelegate next)
    {
        this.next = next;
    }

    public async Task Invoke(HttpContext context, IUserProvider userProvider, IConfiguration config)
    {
        if (!(userProvider.Initialized))
        {
            await userProvider.Create(context, config);
        }

        await next(context);
    }
}