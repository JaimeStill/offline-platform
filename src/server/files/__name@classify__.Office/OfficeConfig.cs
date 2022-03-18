namespace <%= classify(name) %>.Office;

using <%= classify(name) %>.Core.Extensions;

public class OfficeConfig
{
    public string directory;

    public string Directory
    {
        get => directory;
        set
        {
            directory = value;
            Directory.EnsureDirectoryExists();
        }
    }
}