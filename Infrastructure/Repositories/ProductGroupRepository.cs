using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class ProductGroupRepository : IProductGroupRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductGroupRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(ProductGroup entity)
        {
            await _context.ProductGroups.AddAsync(entity);
        }

        public async Task<List<ProductGroup>> GetAllAsync()
        {
            return await _context.ProductGroups.ToListAsync();
        }

        public async Task<ProductGroup?> GetByIdAsync(int id)
        {
            return await _context.ProductGroups.FindAsync(id);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}