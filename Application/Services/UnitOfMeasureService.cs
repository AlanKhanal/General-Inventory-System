using Application.DTOs;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

public class UnitOfMeasureService : IUnitOfMeasureService
{
    private readonly IUnitOfMeasureRepository _repo;
    private readonly IMapper _mapper;

    public UnitOfMeasureService(
        IUnitOfMeasureRepository repo,
        IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<UnitOfMeasureDto> CreateAsync(CreateUnitOfMeasureDto dto, int userId)
    {
        var entity = new UnitOfMeasure
        {
            Name = dto.Name,
            Code = dto.Code,
            Description = dto.Description,
            CreatedByUserId = userId
        };

        await _repo.AddAsync(entity);
        await _repo.SaveChangesAsync();

        return _mapper.Map<UnitOfMeasureDto>(entity);
    }

    public async Task<List<UnitOfMeasureDto>> GetAllAsync()
    {
        var data = await _repo.GetAllAsync();
        return _mapper.Map<List<UnitOfMeasureDto>>(data);
    }
}