
namespace Application.Interfaces
{
    public interface IProductService
    {
        Task<ProductDto> CreateAsync(CreateProductDto dto, int userId);

        Task<List<ProductDto>> GetAllAsync();

        Task<ProductDto?> GetByIdAsync(int id);
        Task<List<ProductDto>> GetStockAsync();

        //stocknew
        Task<List<CurrentStockDto>> GetCurrentStockAsync();

        Task UpdateAsync(int id, CreateProductDto dto);
    }
}