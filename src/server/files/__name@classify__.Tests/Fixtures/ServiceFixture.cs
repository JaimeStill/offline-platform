using <%= classify(name) %>.DbCli;
using <%= classify(name) %>.Models;

namespace <%= classify(name) %>.Tests.Fixtures;
public class ServiceFixture<T, S> : IDisposable
	where T : EntityBase
	where S : IService<T>
{
	readonly DbManager db;
	public S Svc { get; private set; }

	public ServiceFixture()
	{
		db = new("Test", true);
		db.Initialize();
		Svc = (S)Activator.CreateInstance(typeof(S), db.Context);
		Svc.SeedTest().Wait();
	}

	public void Dispose()
	{
		db.Dispose();
		GC.SuppressFinalize(this);
	}
}