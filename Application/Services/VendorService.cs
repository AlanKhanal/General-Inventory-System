using Application.DTOs;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class VendorService : IVendorService
    {
        private readonly IVendorRepository _repo;
        private readonly IMapper _mapper;

        public VendorService(IVendorRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<VendorDto> CreateAsync(CreateVendorDto dto, int userId)
        {
            var vendor = new Vendor
            {
                Name = dto.Name,
                Description = dto.Description,
                CreatedByUserId = userId
            };

            await _repo.AddAsync(vendor);
            await _repo.SaveChangesAsync();

            return _mapper.Map<VendorDto>(vendor);
        }

        public async Task<List<VendorDto>> GetAllAsync()
        {
            var data = await _repo.GetAllAsync();
            return _mapper.Map<List<VendorDto>>(data);
        }

        public async Task<VendorDto?> GetByIdAsync(int id)
        {
            var vendor = await _repo.GetByIdAsync(id);

            if (vendor == null)
                return null;

            return _mapper.Map<VendorDto>(vendor);
        }

        public async Task UpdateAsync(int id, CreateVendorDto dto)
        {
            var vendor = await _repo.GetByIdAsync(id);

            if (vendor == null)
                throw new Exception("Vendor not found");

            vendor.Name = dto.Name;
            vendor.Description = dto.Description;

            await _repo.UpdateAsync(vendor);
            await _repo.SaveChangesAsync();
        }
    }
}