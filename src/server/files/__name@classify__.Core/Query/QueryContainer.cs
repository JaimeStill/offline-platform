using Microsoft.EntityFrameworkCore;

namespace <%= classify(name) %>.Core.Query;
public class QueryContainer<T>
{
    const int DEFAULT_PAGE_SIZE = 20;

    private IQueryable<T> queryable;
    private readonly QueryOptions options;

    public IQueryable<T> Queryable => queryable;
    public QueryOptions Options => options;

    public QueryContainer(IQueryable<T> queryable, string page, string pageSize, string search, string sort)
    {
        var query = new QueryParams
        {
            Page = page,
            PageSize = pageSize,
            Search = search,
            Sort = sort
        };

        options = QueryOptions.FromQuery(query, DEFAULT_PAGE_SIZE);
        this.queryable = queryable.ApplySorting(options);
    }

    public QueryContainer(IQueryable<T> queryable, QueryParams queryParams)
    {
        options = QueryOptions.FromQuery(queryParams, DEFAULT_PAGE_SIZE);
        this.queryable = queryable.ApplySorting(options);
    }

    public async Task<QueryResult<T>> Query(Func<IQueryable<T>, string, IQueryable<T>> search)
    {
        if (!string.IsNullOrEmpty(Options.Search))
            queryable = search(Queryable, Options.Search);

        dynamic dynamicQueryable = Queryable;

        var totalCount = await EntityFrameworkQueryableExtensions.CountAsync(dynamicQueryable);

        if (totalCount <= ((Options.Page - 1) * Options.PageSize))
        {
            Options.Page = (int)Math.Ceiling((decimal)totalCount / Options.PageSize);
            Options.Page = Options.Page == 0
                ? 1
                : Options.Page;
        }

        return new QueryResult<T>
        {
            Page = Options.Page,
            PageSize = Options.PageSize,
            TotalCount = totalCount,
            Data = await Queryable
                .Skip((Options.Page - 1) * Options.PageSize)
                .Take(Options.PageSize)
                .ToListAsync()
        };
    }
}