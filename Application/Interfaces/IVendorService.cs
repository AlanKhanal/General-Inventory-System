using Application.DTOs;

namespace Application.Interfaces
{
    public interface IVendorService
    {
        Task<VendorDto> CreateAsync(CreateVendorDto dto, int userId);
        Task<List<VendorDto>> GetAllAsync();
        Task<VendorDto?> GetByIdAsync(int id);
        Task UpdateAsync(int id, CreateVendorDto dto);
    }
}