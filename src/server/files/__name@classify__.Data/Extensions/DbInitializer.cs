namespace <%= classify(name) %>.Data.Extensions;

using Microsoft.EntityFrameworkCore;

public static class DbInitializer
{
    public static async Task Initialize(this AppDbContext db)
    {
        Console.WriteLine("Initializing database");
        await db.Database.MigrateAsync();
        Console.WriteLine("Database initialized");
    }
}