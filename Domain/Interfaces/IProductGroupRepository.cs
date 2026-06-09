using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IProductGroupRepository
    {
        Task AddAsync(ProductGroup entity);

        Task<List<ProductGroup>> GetAllAsync();

        Task<ProductGroup?> GetByIdAsync(int id);

        Task SaveChangesAsync();
    }
}