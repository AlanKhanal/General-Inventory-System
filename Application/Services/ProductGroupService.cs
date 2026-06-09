using Application.DTOs;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class ProductGroupService : IProductGroupService
    {
        private readonly IProductGroupRepository _repo;
        private readonly IMapper _mapper;

        public ProductGroupService(
            IProductGroupRepository repo,
            IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<ProductGroupDto> CreateAsync(
            CreateProductGroupDto dto,
            int userId)
        {
            var entity = new ProductGroup
            {
                Name = dto.Name,
                Description = dto.Description,
                CreatedByUserId = userId
            };

            await _repo.AddAsync(entity);
            await _repo.SaveChangesAsync();

            return _mapper.Map<ProductGroupDto>(entity);
        }

        public async Task<List<ProductGroupDto>> GetAllAsync()
        {
            var data = await _repo.GetAllAsync();

            return _mapper.Map<List<ProductGroupDto>>(data);
        }
    }
}