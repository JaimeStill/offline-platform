namespace <%= classify(name) %>.Core.Query;
public class QueryParams
{
    public string Page { get; set; }
    public string PageSize { get; set; }
    public string Search { get; set; }
    public string Sort { get; set; }
}