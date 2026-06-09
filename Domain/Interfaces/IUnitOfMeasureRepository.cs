using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IUnitOfMeasureRepository
    {
        Task<UnitOfMeasure?> GetByIdAsync(int id);

        Task<List<UnitOfMeasure>> GetAllAsync();

        Task AddAsync(UnitOfMeasure uom);

        Task SaveChangesAsync();
    }
}