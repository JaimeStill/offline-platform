using Microsoft.Extensions.DependencyInjection;

namespace <%= classify(name) %>.Services;
public static class ServiceExtensions
{
	public static void AddAppServices(this IServiceCollection services)
	{
		// services.AddScoped<Service>();
	}
}