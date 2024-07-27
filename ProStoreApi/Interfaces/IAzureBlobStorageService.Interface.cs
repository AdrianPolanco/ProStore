using ProStoreApi.Enums;

namespace ProStoreApi.Interfaces
{
    public interface IAzureBlobStorageService
    {
        Task<string> UploadFileAsync(IFormFile file, CancellationToken cancellationToken, ContainerEnum container, string? blobName = null);
        Task DeleteFileAsync(ContainerEnum container, string blobFileName, CancellationToken cancellationToken);
    }
}
