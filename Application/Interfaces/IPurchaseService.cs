using Application.DTOs.Purchase;

namespace Application.Interfaces
{
    public interface IPurchaseService
    {
        Task<int> CreatePurchaseAsync(CreatePurchaseDto dto, int userId);

        Task<List<PurchaseDto>> GetAllAsync();

        Task<PurchaseDto?> GetByIdAsync(int id);
    }
}