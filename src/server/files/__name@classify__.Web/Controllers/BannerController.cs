using <%= classify(name) %>.Core.Banner;
using Microsoft.AspNetCore.Mvc;

namespace <%= classify(name) %>.Web.Controllers;

[Route("api/[controller]")]
public class BannerController : Controller
{
    readonly BannerConfig config;

    public BannerController(BannerConfig config) => this.config = config;

    [HttpGet("[action]")]
    public BannerConfig GetConfig() => config;
}