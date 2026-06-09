using Application.DTOs;

namespace Application.Interfaces
{
    public interface IProductGroupService
    {
        Task<ProductGroupDto> CreateAsync(
            CreateProductGroupDto dto,
            int userId);

        Task<List<ProductGroupDto>> GetAllAsync();
    }
}