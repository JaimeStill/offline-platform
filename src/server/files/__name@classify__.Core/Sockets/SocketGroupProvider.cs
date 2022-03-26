namespace <%= classify(name) %>.Core.Sockets;

using Microsoft.AspNetCore.SignalR;

public class SocketGroupProvider
{
    public List<SocketGroup> SocketGroups { get; set; }

    public SocketGroupProvider()
    {
        SocketGroups = new List<SocketGroup>();
    }

    public async Task AddToSocketGroup(string connectionId, string group, IGroupManager groups)
    {
        var check = SocketGroups.FirstOrDefault(x => x.Name == group);

        if (check is null)
            SocketGroups.Add(new SocketGroup
            {
                Name = group,
                Connections = new List<string> { connectionId }
            });
        else
            if (!check.Connections.Contains(connectionId))
                check.Connections.Add(connectionId);

        await groups.AddToGroupAsync(connectionId, group);
    }

    public async Task RemoveFromSocketGroup(string group, string connectionId, IGroupManager groups)
    {
        var check = SocketGroups.FirstOrDefault(x => x.Name == group);

        if (check is not null)
            if (check.Connections.Contains(connectionId))
            {
                check.Connections.Remove(connectionId);

                if (check.Connections.Count < 1)
                    SocketGroups.Remove(check);
            }

        await groups.RemoveFromGroupAsync(connectionId, group);
    }
}