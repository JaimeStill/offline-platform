using Microsoft.AspNetCore.Mvc;
using <%= classify(name) %>.Models;
using <%= classify(name) %>.Core.Query;

namespace <%= classify(name) %>.Web.Controllers;
public abstract class EntityController<T> : ControllerBase where T : EntityBase
{
	protected readonly IService<T> svc;

	public EntityController(IService<T> svc)
	{
		this.svc = svc;
	}

	[HttpGet("[action]")]
	public virtual async Task<IActionResult> Query([FromQuery]QueryParams queryParams) =>
		Ok(await svc.QueryAll(queryParams));

	[HttpGet("[action]/{id}")]
	public virtual async Task<IActionResult> Find([FromRoute]int id) =>
		Ok(await svc.Find(id));

	[HttpPost("[action]")]
	public virtual async Task<IActionResult> Validate([FromBody]T entity) =>
		Ok(await svc.Validate(entity));

	[HttpPost("[action]")]
	public virtual async Task<IActionResult> Save([FromBody]T entity) =>
		Ok(await svc.Save(entity));

	[HttpDelete("[action]")]
	public virtual async Task<IActionResult> Remove([FromBody]T entity) =>
		Ok(await svc.Remove(entity));
}