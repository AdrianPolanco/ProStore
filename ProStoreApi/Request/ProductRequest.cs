namespace ProStoreApi.Request
{
    public class ProductRequest
    {
        public string Name { get; set; }
        public IFormFile Image { get; set; }
        public string? Url { get; set; }
    }
}
