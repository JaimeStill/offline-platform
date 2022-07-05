using <%= classify(name) %>.Core.Query;
using <%= classify(name) %>.Models;
using <%= classify(name) %>.Tests.Attributes;
using <%= classify(name) %>.Tests.Fixtures;

namespace <%= classify(name) %>.Tests;

[TestCaseOrderer("<%= classify(name) %>.Tests.PriorityOrderer", "<%= classify(name) %>.Tests")]
public abstract class TestBase<T, S> : IClassFixture<ServiceFixture<T, S>>
	where T : EntityBase
	where S : IService<T>
{
	public IService<T> Svc { get; private set; }

	public TestBase(ServiceFixture<T, S> fixture)
	{
		Svc = fixture.Svc;
	}

	#region Tests

	[Fact]
	public async Task QueryAll()
	{
		var res = await Svc.QueryAll(new QueryParams());
		Assert.NotEmpty(res.Data);
	}

	[Theory]
	[InlineData(1)]
	[InlineData(2)]
	public async Task Find(int id)
	{
		var res = await Svc.Find(id);
		Assert.NotNull(res);
		Assert.Equal(id, res.Id);
	}

	/*
		Higher priority tests are run
		later. Default priority is 0.
		This prevents Remove from being
		called before Find.
	*/
	[Theory, TestPriority(1)]
	[InlineData(1)]
	[InlineData(2)]
	public async Task Remove(int id)
	{
		var entity = await Svc.Find(id);
		var res = await Svc.Remove(entity);
		Assert.True(res);
	}

	#endregion
}