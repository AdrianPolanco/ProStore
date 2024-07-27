using Microsoft.EntityFrameworkCore;
using ProStoreApi.Models;

namespace ProStoreApi
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

    }
}
