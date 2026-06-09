using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IVendorRepository
    {
        Task AddAsync(Vendor entity);
        Task<List<Vendor>> GetAllAsync();
        Task<Vendor?> GetByIdAsync(int id);
        Task UpdateAsync(Vendor entity);
        Task SaveChangesAsync();
    }
}