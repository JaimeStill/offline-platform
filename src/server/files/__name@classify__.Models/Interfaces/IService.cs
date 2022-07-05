using <%= classify(name) %>.Core.Query;

namespace <%= classify(name) %>.Models;
public interface IService<T> where T : EntityBase
{
	Task<QueryResult<T>> QueryAll(QueryParams queryParams);
	Task<T> Find(int id);
	Task<bool> Validate(T entity);
	Task<T> Save(T entity);
	Task<bool> Remove(T entity);
	Task Seed();
	Task SeedTest();
}