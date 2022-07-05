[assembly:System.Runtime.Versioning.SupportedOSPlatform("windows")]
namespace <%= classify(name) %>.Auth;

using <%= classify(name) %>.Core.Exceptions;
using <%= classify(name) %>.Data;
using <%= classify(name) %>.Identity;

public static class AuthorizationExtensions
{
    static AppException Denied(this IUserProvider provider, string message = "")
    {
        if (string.IsNullOrEmpty(message))
            return new AppException(
                $"{provider.CurrentUser.SamAccountName} is not authorized to access this resource",
                ExceptionType.Authorization
            );
        else
            return new AppException(message, ExceptionType.Authorization);
    }

    /*
        Example Authorization Configuration

        public static async Task<T> AuthorizeAdmin<T>(
            this AppDbContext db,
            IUserProvider provider,
            Func<AppDbContext, Task<T>> exec
        )
        {
            if (await db.ValidateAdmin(provider))
            {
                return await exec(db);
            }
            else
                throw provider.Denied($"{provider.CurrentUser.SamAccountName} is not an administrator");
        }

        public static async Task AuthorizeAdmin(
            this AppDbContext db,
            IUserProvider provider,
            Func<AppDbContext, Task> exec
        )
        {
            if (await db.ValidateAdmin(provider))
                await exec(db);
            else
                throw provider.Denied($"{provider.CurrentUser.SamAccountName} is not an administrator");
        }

        public static async Task<bool> ValidateAdmin(this AppDbContext db, IUserProvider provider)
        {
            var user = await db.Users
                .FirstOrDefaultAsync(x => x.Guid == provider.CurrentUser.Guid.Value);

            return user == null
                ? false
                : user.IsAdmin;
        }
    */

    /*
        Example Usage in a Controller

        [HttpPost("[action]")]
        public async Task SubmitData([FromBody]Data data) =>
            await db.AuthorizeAdmin(provider, db => db.SubmitData(data));
    */
}