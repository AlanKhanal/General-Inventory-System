using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ICustomerRepository
    {
        Task AddAsync(Customer entity);
        Task<List<Customer>> GetAllAsync();
        Task<Customer?> GetByIdAsync(int id);
        Task UpdateAsync(Customer entity);
        Task SaveChangesAsync();
    }
}