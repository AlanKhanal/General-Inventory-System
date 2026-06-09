using Application.DTOs;

public interface IUnitOfMeasureService
{
    Task<UnitOfMeasureDto> CreateAsync(CreateUnitOfMeasureDto dto, int userId);

    Task<List<UnitOfMeasureDto>> GetAllAsync();
/*
    Task<UnitOfMeasureDto?> GetByIdAsync(int id);

    Task UpdateAsync(int id, CreateUnitOfMeasureDto dto);

    Task DeleteAsync(int id);*/
}