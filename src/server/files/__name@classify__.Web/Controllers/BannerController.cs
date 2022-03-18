namespace <%= classify(name) %>.Web.Controllers;

using <%= classify(name) %>.Core.Banner;

using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
public class BannerController : Controller
{
    private BannerConfig config;

    public BannerController(BannerConfig config) => this.config = config;

    [HttpGet("[action]")]
    public BannerConfig GetConfig() => config;
}