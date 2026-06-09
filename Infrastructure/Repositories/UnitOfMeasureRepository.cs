using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class UnitOfMeasureRepository : IUnitOfMeasureRepository
    {
        private readonly ApplicationDbContext _context;

        public UnitOfMeasureRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(UnitOfMeasure uom)
        {
            await _context.UnitsOfMeasure.AddAsync(uom);
        }

        public async Task<List<UnitOfMeasure>> GetAllAsync()
        {
            return await _context.UnitsOfMeasure.ToListAsync();
        }

        public async Task<UnitOfMeasure?> GetByIdAsync(int id)
        {
            return await _context.UnitsOfMeasure.FindAsync(id);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}