namespace <%= classify(name) %>.Identity.Extensions;

using System.DirectoryServices.AccountManagement;

public static class IdentityExtensions
{
    public static IQueryable<UserPrincipal> FilterUsers(this IQueryable<UserPrincipal> principals) =>
        principals.Where(x => x.Guid.HasValue);

    public static IQueryable<AdUser> SelectAdUsers(this IQueryable<UserPrincipal> principals) =>
        principals.Select(x => AdUser.CastToAdUser(x));
}
