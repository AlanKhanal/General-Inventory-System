using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class VendorRepository : IVendorRepository
    {
        private readonly ApplicationDbContext _context;

        public VendorRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Vendor entity)
        {
            await _context.Vendors.AddAsync(entity);
        }

        public async Task<List<Vendor>> GetAllAsync()
        {
            return await _context.Vendors.ToListAsync();
        }

        public async Task<Vendor?> GetByIdAsync(int id)
        {
            return await _context.Vendors.FindAsync(id);
        }

        public async Task UpdateAsync(Vendor entity)
        {
            _context.Vendors.Update(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}