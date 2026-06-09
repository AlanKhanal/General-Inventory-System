using Application.DTOs;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _repo;
        private readonly IMapper _mapper;

        public CustomerService(ICustomerRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<CustomerDto> CreateAsync(CreateCustomerDto dto, int userId)
        {
            var customer = new Customer
            {
                Name = dto.Name,
                Description = dto.Description,
                CreatedByUserId = userId
            };

            await _repo.AddAsync(customer);
            await _repo.SaveChangesAsync();

            return _mapper.Map<CustomerDto>(customer);
        }

        public async Task<List<CustomerDto>> GetAllAsync()
        {
            var data = await _repo.GetAllAsync();
            return _mapper.Map<List<CustomerDto>>(data);
        }

        public async Task<CustomerDto?> GetByIdAsync(int id)
        {
            var customer = await _repo.GetByIdAsync(id);

            if (customer == null)
                return null;

            return _mapper.Map<CustomerDto>(customer);
        }

        public async Task UpdateAsync(int id, CreateCustomerDto dto)
        {
            var customer = await _repo.GetByIdAsync(id);

            if (customer == null)
                throw new Exception("Customer not found");

            customer.Name = dto.Name;
            customer.Description = dto.Description;

            await _repo.UpdateAsync(customer);
            await _repo.SaveChangesAsync();
        }
    }
}