using ProStoreApi.Models;
using ProStoreApi.Request;

namespace ProStoreApi.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetAsync(CancellationToken cancellationToken);
        Task<(bool success, string message)> PostAsync(ProductRequest request, CancellationToken cancellationToken);
        Task<(bool success, string message)> PutAsync(Guid id, ProductRequest request, CancellationToken cancellationToken);
        Task<(bool success, string message)> DeleteAsync(Guid id, CancellationToken cancellationToken);
    }
}
