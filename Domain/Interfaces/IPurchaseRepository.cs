using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IPurchaseRepository
    {
        Task AddAsync(Purchase purchase);

        Task<Purchase?> GetByIdAsync(int id);

        Task<List<Purchase>> GetAllAsync();

        Task SaveChangesAsync();
    }
}