namespace <%= classify(name) %>.Web.Hubs;

using <%= classify(name) %>.Data.Models;

using Microsoft.AspNetCore.SignalR;

public class SyncHub : Hub
{
    public async Task triggerSync(Sync sync) =>
        await Clients
            .Others
            .SendAsync("sync", sync);

    public async Task triggerIdentity(string user, string message) =>
        await Clients
            .User(user)
            .SendAsync(
                "identity",
                message.Length > 0
                    ? message
                    : string.Empty
            );

    public async Task triggerNotify(string user, string message) =>
        await Clients
            .User(user)
            .SendAsync("notify", message);

    public async Task triggerWorkflow(int id) =>
        await Clients
            .Others
            .SendAsync("workflow", id);
}