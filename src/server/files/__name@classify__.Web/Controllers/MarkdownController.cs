namespace <%= classify(name) %>.Web.Controllers;

using <%= classify(name) %>.Core.Markdown;
using <%= classify(name) %>.Core.Markdown.Extensions;

using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
public class MarkdownController : Controller
{
    private IWebHostEnvironment environment;
    private bool isWindows;
    private readonly string slash;

    public MarkdownController(IWebHostEnvironment environment, IConfiguration config)
    {
        this.environment = environment;
        this.isWindows = config.GetValue<bool>("App.IsWindows");
        this.slash = isWindows
            ? @"\"
            : "/";
    }

    [HttpGet("[action]/{*path}")]
    public Folder GetFolder([FromRoute]string path)
    {
        if (string.IsNullOrEmpty(path))
        {
            return environment.WebRootPath.GetFolder(null);
        }

        var crumb = path.GetDirectoryPath(false);
        path = GetFullPath(path);

        return path.GetFolder(crumb.Split('/'), true);
    }

    [HttpGet("[action]/{*path}")]
    public async Task<Document> GetDocument([FromRoute]string path)
    {
        path = GetFullPath(path);
        return await path.GetDocument();
    }

    string GetFullPath(string path) => isWindows
        ? $@"{environment.WebRootPath}{slash}{path.Replace('/', '\\')}"
        : $@"{environment.WebRootPath}{slash}{path}";
}