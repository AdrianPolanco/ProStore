using Azure.Storage.Blobs.Models;
using Azure.Storage.Blobs;
using ProStoreApi.Enums;
using ProStoreApi.Interfaces;

namespace ProStoreApi.Services
{
    public class AzureBlobStorageService : IAzureBlobStorageService
    {
        private readonly string _connectionString;

        public AzureBlobStorageService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("BlobStorageConnection")!;
        }

        public async Task<string> UploadFileAsync(IFormFile file, CancellationToken cancellationToken, ContainerEnum container, string? blobName = null)
        {
            if (file.Length == 0) return null;
            string containerName = Enum.GetName(typeof(ContainerEnum), container).ToLower();
            BlobContainerClient blobServiceClient = new BlobContainerClient(_connectionString, containerName);

            if (string.IsNullOrEmpty(blobName)) blobName = Guid.NewGuid().ToString();

            BlobClient blobClient = blobServiceClient.GetBlobClient(blobName);

            BlobHttpHeaders blobHttpHeaders = new BlobHttpHeaders { ContentType = file.ContentType };

            await using (Stream stream = file.OpenReadStream())
            {
                BlobUploadOptions blobUploadOptions = new BlobUploadOptions { HttpHeaders = blobHttpHeaders };
                await blobClient.UploadAsync(stream, blobUploadOptions, cancellationToken);
            }

            return blobName;
        }

        public async Task DeleteFileAsync(ContainerEnum container, string blobFileName, CancellationToken cancellationToken)
        {
            string containerName = Enum.GetName(typeof(ContainerEnum), container).ToLower();
            BlobContainerClient blobServiceClient = new BlobContainerClient(_connectionString, containerName);
            BlobClient blobClient = blobServiceClient.GetBlobClient(blobFileName);

            await blobClient.DeleteIfExistsAsync(cancellationToken: cancellationToken);
        }
    }
}
