using <%= classify(name) %>.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace <%= classify(name) %>.DbCli;
public class DbManager : IDisposable
{
	readonly bool destroy;
	public AppDbContext Context { get; private set; }

	static string GetConnectionString(string env)
	{
		IConfiguration config = new ConfigurationBuilder()
			.AddJsonFile("appsettings.json")
			.AddEnvironmentVariables()
			.Build();

		string connection = config.GetConnectionString(env);
		Console.WriteLine($"Connection string: {connection}");

		return connection;
	}

	static AppDbContext GetDbContext(string connection)
	{
		var builder = new DbContextOptionsBuilder<AppDbContext>()
			.UseSqlServer(connection);

		return new AppDbContext(builder.Options);
	}

	public DbManager(string env = "Dev", bool destroy = false)
	{
		this.destroy = destroy;
		Context = GetDbContext(GetConnectionString(env));
	}

	public void Initialize()
	{
		if (destroy)
			Context.Database.EnsureDeleted();

		Context.Database.Migrate();
	}

	public async Task InitializeAsync()
	{
		if (destroy)
			await Context.Database.EnsureDeletedAsync();

		await Context.Database.MigrateAsync();
	}

	public void Dispose()
	{
		if (destroy)
			Context.Database.EnsureDeleted();

		Context.Dispose();
		GC.SuppressFinalize(this);
	}
}