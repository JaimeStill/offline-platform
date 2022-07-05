using Microsoft.EntityFrameworkCore;
using <%= classify(name) %>.Core.Query;
using <%= classify(name) %>.Core.Exceptions;
using <%= classify(name) %>.Core.Extensions;
using <%= classify(name) %>.Data;
using <%= classify(name) %>.Models;

namespace <%= classify(name) %>.Services;
public class ServiceBase<T> : IService<T> where T : EntityBase
{
	protected AppDbContext db;
	protected DbSet<T> set;

	public ServiceBase(AppDbContext db)
	{
		this.db = db;
		set = db.Set<T>();
	}

	protected virtual Func<IQueryable<T>, string, IQueryable<T>> Search => (values, term) => values;

	protected virtual async Task<QueryResult<T>> Query(
		IQueryable<T> queryable,
		QueryParams queryParams,
		Func<IQueryable<T>, string, IQueryable<T>> search
	)
	{
		var container = new QueryContainer<T>(
			queryable,
			queryParams
		);

		return await container.Query((data, s) =>
			data.SetupSearch(s, search));
	}

	protected virtual async Task<T> Add(T entity)
	{
		try
		{
			await set.AddAsync(entity);
			await db.SaveChangesAsync();
			return entity;
		}
		catch (Exception ex)
		{
			throw new ServiceException<T>("Add", ex);
		}
	}

	protected virtual async Task<T> Update(T entity)
	{
		try
		{
			set.Update(entity);
			await db.SaveChangesAsync();
			return entity;
		}
		catch (Exception ex)
		{
			throw new ServiceException<T>("Update", ex);
		}
	}

	public static IService<T> Create(AppDbContext db) =>
		new ServiceBase<T>(db);

	public virtual async Task<QueryResult<T>> QueryAll(QueryParams queryParams) =>
		await Query(
			set, queryParams, Search
		);

	public virtual async Task<T> Find(int id) =>
		await set.FindAsync(id);

	public virtual Task<bool> Validate(T entity) => Task.FromResult(true);

	public virtual async Task<T> Save(T entity)
	{
		try
		{
			await Validate(entity);

			return entity.Id > 0
				? await Update(entity)
				: await Add(entity);
		}
		catch (Exception ex)
		{
			throw new ServiceException<T>("Validate", ex);
		}
	}

	public virtual async Task<bool> Remove(T entity)
	{
		set.Remove(entity);
		await db.SaveChangesAsync();
		return true;
	}

	public virtual Task Seed() => Task.CompletedTask;

	public virtual Task SeedTest() => Task.CompletedTask;
}