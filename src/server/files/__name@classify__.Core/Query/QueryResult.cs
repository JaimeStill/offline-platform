namespace <%= classify(name) %>.Core.Query;
public class QueryResult<T>
{
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
    public List<T> Data { get; set; }
}