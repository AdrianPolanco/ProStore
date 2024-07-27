using Microsoft.AspNetCore.Mvc;
using ProStoreApi.Interfaces;
using ProStoreApi.Models;
using ProStoreApi.Request;

namespace ProStoreApi.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(CancellationToken cancellationToken)
        {
            IEnumerable<Product> products = await _productService.GetAsync(cancellationToken);
            return Ok(products);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] ProductRequest request, CancellationToken cancellationToken)
        {
            (bool success, string message) = await _productService.PostAsync(request, cancellationToken);

            if (success) return Ok(new { success, message });


            return BadRequest(new { success, message });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromForm] ProductRequest request, CancellationToken cancellationToken)
        {
            (bool success, string message) = await _productService.PutAsync(id, request, cancellationToken);

            if (success) return Ok(new { success, message });


            return BadRequest(new { success, message });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
        {
            (bool success, string message) = await _productService.DeleteAsync(id, cancellationToken);

            if (success) return Ok(new { success, message });


            return BadRequest(new { success, message });
        }
    }
}
