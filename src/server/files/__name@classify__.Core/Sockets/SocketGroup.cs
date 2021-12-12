namespace <%= classify(name) %>.Core.Sockets
{
    public class SocketGroup
    {
        public string Name { get; set; }
        public List<string> Connections { get; set; }
    }
}
