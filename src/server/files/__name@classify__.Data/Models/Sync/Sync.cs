namespace <%= classify(name) %>.Data.Models;

public class Sync
{
    public int Id { get; set; }
    public bool IsOrigin { get; set; }
    public bool IsRemoved { get; set; }
    public string Type { get; set; }
}