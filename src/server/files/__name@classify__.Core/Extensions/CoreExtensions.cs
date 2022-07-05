using <%= classify(name) %>.Core.Exceptions;
using <%= classify(name) %>.Core.Logging;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Text;
using System.Text.RegularExpressions;

namespace <%= classify(name) %>.Core.Extensions;
public static class CoreExtensions
{
    private static readonly string jsTimeFormat = "yyyy-MM-ddTHH:mm:ss.fffZ";
    private static readonly string urlPattern = "[^a-zA-Z0-9-.]";

    public static string UpdateDateTime(
        this DateTime date,
        int years = 0,
        int months = 0,
        int days = 0,
        int hours = 0,
        int minutes = 0
    ) => date
        .AddYears(years)
        .AddMonths(months)
        .AddDays(days)
        .AddHours(hours)
        .AddMinutes(minutes)
        .ToString(jsTimeFormat);

    public static string ToJsDateString(this DateTime date) => date.ToString(jsTimeFormat);

    public static string GetModuleBase(this IConfiguration config, string module) =>
        config.GetSection("AppModules")
            .GetValue<string>(module.ToLower());

    public static IQueryable<T> SetupSearch<T>(
        this IQueryable<T> values,
        string search,
        Func<IQueryable<T>, string, IQueryable<T>> action,
        char split = '|'
    )
    {
        if (search.Contains(split))
        {
            var searches = search.Split(split);

            foreach (var s in searches)
            {
                values = action(values, s.Trim());
            }

            return values;
        }
        else
            return action(values, search);
    }

    public static string SerializeToJson<T>(
        this T data,
        ReferenceLoopHandling referenceLoopHandling = ReferenceLoopHandling.Ignore,
        MetadataPropertyHandling metadataPropertyHandling = MetadataPropertyHandling.Ignore,
        Formatting formatting = Formatting.Indented,
        NullValueHandling nullValueHandling = NullValueHandling.Ignore
    )
    {
        var settings = new JsonSerializerSettings
        {
            ReferenceLoopHandling = referenceLoopHandling,
            MetadataPropertyHandling = metadataPropertyHandling,
            Formatting = formatting,
            NullValueHandling = nullValueHandling,
            ContractResolver = new CamelCasePropertyNamesContractResolver()
        };

        return JsonConvert.SerializeObject(data, settings);
    }

    public static object DeserializeJson(
        this Type type,
        string data
    ) => JsonConvert.DeserializeObject(data, type);

    public static void EnsureDirectoryExists(this string path)
    {
        if (!Directory.Exists(path))
        {
            Directory.CreateDirectory(path);
        }
    }

    public static string UrlEncode(this string url) => url.UrlEncode(urlPattern, "-");

    public static string UrlEncode(this string url, string pattern, string replace = "")
    {
        var friendlyUrl = Regex.Replace(url, @"\s", "-").ToLower();
        friendlyUrl = Regex.Replace(friendlyUrl, pattern, replace);
        return friendlyUrl;
    }

    public static string GetExceptionChain(this Exception ex)
    {
        var message = new StringBuilder(ex.Message);

        if (ex.InnerException != null)
        {
            message.AppendLine();
            message.AppendLine(GetExceptionChain(ex.InnerException));
        }

        return message.ToString();
    }

    public static void HandleError(this IApplicationBuilder app, LogProvider logger)
    {
        app.Run(async context =>
        {
            var error = context.Features.Get<IExceptionHandlerFeature>();

            if (error != null)
            {
                var ex = error.Error;

                if (ex is AppException exception)
                {
                    switch (exception.ExceptionType)
                    {
                        case ExceptionType.Authorization:
                            await logger.CreateLog(context, ex, "auth");
                            break;
                        case ExceptionType.Validation:
                            break;
                        default:
                            await logger.CreateLog(context, ex);
                            break;
                    }

                    await context.SendErrorResponse(ex);
                }
                else
                {
                    await logger.CreateLog(context, ex);
                    await context.SendErrorResponse(ex);
                }
            }
        });
    }

    static async Task SendErrorResponse(this HttpContext context, Exception ex)
    {
        context.Response.StatusCode = 500;
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsync(ex.GetExceptionChain(), Encoding.UTF8);
    }
}
