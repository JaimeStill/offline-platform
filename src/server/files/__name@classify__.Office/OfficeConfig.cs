using <%= classify(name) %>.Core.Extensions;

namespace <%= classify(name) %>.Office
{
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
}