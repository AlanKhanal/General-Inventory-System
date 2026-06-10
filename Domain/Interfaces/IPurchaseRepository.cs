using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IPurchaseRepository
    {
        Task AddAsync(Purchase purchase);

        Task SaveChangesAsync();

        Task<List<Purchase>> GetAllAsync();

        Task<Purchase?> GetByIdAsync(int id);
    }
}