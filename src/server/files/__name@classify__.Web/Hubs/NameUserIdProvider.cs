namespace <%= classify(name) %>.Web.Hubs;

using Microsoft.AspNetCore.SignalR;

public class NameUserIdProvider : IUserIdProvider
{
    public string GetUserId(HubConnectionContext connection) => connection.User.Identity.Name;
}