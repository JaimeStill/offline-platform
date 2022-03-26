namespace <%= classify(name) %>.Web.Hubs;

public static class HubExtensions
{
    public static void MapHubs(this IEndpointRouteBuilder endpoint)
    {
        endpoint.MapHub<SyncHub>("/sync");
        endpoint.MapHub<ChannelHub>("/channel");
    }
}