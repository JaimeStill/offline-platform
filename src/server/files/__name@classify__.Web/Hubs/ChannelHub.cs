namespace <%= classify(name) %>.Web.Hubs;

using <%= classify(name) %>.Core.Sockets;
using <%= classify(name) %>.Data.Models;

using Microsoft.AspNetCore.SignalR;

public class ChannelHub : Hub
{
    readonly SocketGroupProvider groups;

    public ChannelHub(SocketGroupProvider groups)
    {
        this.groups = groups;
    }

    public override async Task OnDisconnectedAsync(Exception ex)
    {
        var connections = groups
            .SocketGroups
            .Where(x => x.Connections.Contains(Context.ConnectionId))
            .Select(x => x.Name)
            .Distinct()
            .ToList();

        foreach (var group in connections)
        {
            await groups.RemoveFromSocketGroup(group, Context.ConnectionId, Groups);

            await Clients
                .Group(group)
                .SendAsync("group", $"{Context.UserIdentifier} has left {group}");
        }

        await base.OnDisconnectedAsync(ex);
    }

    public async Task triggerJoin(string group)
    {
        await groups.AddToSocketGroup(group, Context.ConnectionId, Groups);

        await Clients
            .OthersInGroup(group)
            .SendAsync("channel", $"{Context.User.Identity.Name} has joined {group}");
    }

    public async Task triggerLeave(string group)
    {
        await groups.RemoveFromSocketGroup(group, Context.ConnectionId, Groups);

        await Clients
            .Group(group)
            .SendAsync("channel", $"{Context.User.Identity.Name} has left {group}");
    }

    public async Task triggerSync(string group, Sync sync) =>
        await Clients
            .OthersInGroup(group)
            .SendAsync("sync", sync);
}