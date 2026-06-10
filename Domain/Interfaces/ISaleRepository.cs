using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ISaleRepository
    {
        Task AddAsync(Sale sale);

        Task SaveChangesAsync();
    }
}