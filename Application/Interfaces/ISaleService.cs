using Application.DTOs.Sale;

namespace Application.Interfaces
{
    public interface ISaleService
    {
        Task<int> CreateSaleAsync(CreateSaleDto dto, int userId);
    }
}