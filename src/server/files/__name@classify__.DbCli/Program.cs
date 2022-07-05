using <%= classify(name) %>.DbCli;
using <%= classify(name) %>.Services;

try
{
	string env = args.Length > 0
				? args[0]
				: "Dev";

	bool destroy = args.Length > 1
		&& bool.Parse(args[1]);

	using DbManager manager = new (env, destroy);
	await manager.InitializeAsync();

	/*
		Seed from Services:
		EntityService entitySvc = new(manager.Context);
		await entitySvc.Seed();
	*/
}
catch (Exception ex)
{
	throw new Exception("An error occurred while seeding the database", ex);
}