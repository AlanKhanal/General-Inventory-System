using Application.DTOs;

namespace Application.Interfaces
{
    public interface ICustomerService
    {
        Task<CustomerDto> CreateAsync(CreateCustomerDto dto, int userId);
        Task<List<CustomerDto>> GetAllAsync();
        Task<CustomerDto?> GetByIdAsync(int id);
        Task UpdateAsync(int id, CreateCustomerDto dto);
    }
}