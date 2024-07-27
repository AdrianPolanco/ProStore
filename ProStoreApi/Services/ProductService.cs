using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProStoreApi.Enums;
using ProStoreApi.Interfaces;
using ProStoreApi.Models;
using ProStoreApi.Request;

namespace ProStoreApi.Services
{
    public class ProductService : IProductService
    {
        private readonly IAzureBlobStorageService _azureBlobStorageService;
        private readonly ApplicationDbContext _context;

        public ProductService(IAzureBlobStorageService azureBlobStorageService, ApplicationDbContext context)
        {
            _azureBlobStorageService = azureBlobStorageService;
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetAsync(CancellationToken cancellationToken)
        {
            IEnumerable<Product> products = await _context.Products.ToListAsync(cancellationToken);
            return products;
        }

        public async Task<(bool success, string message)> PostAsync([FromForm] ProductRequest request, CancellationToken cancellationToken)
        {
            var product = new Product
            {
                Name = request.Name
            };

            try
            {
                if (request.Image != null)
                {
                    product.ImageUrl = await _azureBlobStorageService.UploadFileAsync(request.Image, cancellationToken, ContainerEnum.Products);
                }

                await _context.Products.AddAsync(product, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);
                return (true, "Product created successfully!");
            }
            catch
            {
                return (false, "An error occurred while creating the product.");
            }
        }

        public async Task<(bool success, string message)> PutAsync(Guid id, [FromForm] ProductRequest request, CancellationToken cancellationToken)
        {
            try
            {
                Product product = await _context.Products.FindAsync(id);

                if (product == null) return (false, "Product not found.");
                if (string.IsNullOrEmpty(request.Name)) return (false, "Name is required.");

                if (string.IsNullOrEmpty(request.Url) && request.Image == null) return (false, "A kind of image is required.");

                product.Name = request.Name;

                if (request.Image != null)
                {
                    product.ImageUrl = await _azureBlobStorageService.UploadFileAsync(request.Image, cancellationToken, ContainerEnum.Products, request.Url);
                }

                _context.Products.Update(product);
                await _context.SaveChangesAsync(cancellationToken);
                return (true, "Product updated successfully!");
            }
            catch
            {
                return (false, "An error occurred while updating the product.");
            }
        }

        public async Task<(bool success, string message)> DeleteAsync(Guid id, CancellationToken cancellationToken)
        {
            try
            {
                Product product = await _context.Products.FindAsync(id);

                if (product == null) return (false, "Product not found.");

                if (!string.IsNullOrEmpty(product.ImageUrl)) await _azureBlobStorageService.DeleteFileAsync(ContainerEnum.Products, product.ImageUrl, cancellationToken);


                _context.Products.Remove(product);
                await _context.SaveChangesAsync(cancellationToken);
                return (true, "Product deleted successfully!");
            }
            catch
            {
                return (false, "An error occurred while deleting the product.");
            }
        }
    }
}