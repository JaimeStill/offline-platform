namespace <%= classify(name) %>.Core.Exceptions;
public class ServiceException<T> : Exception
{
	static string BuildMessage(string method)
	{
		string type = typeof(T).ToString();
		return $"{type} {method} method error";
	}

	public ServiceException(string method, Exception ex)
		: base(BuildMessage(method), ex) { }
}