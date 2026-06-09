using Application.DTOs;
using AutoMapper;
using Domain.Entities;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDto>();
        CreateMap<CreateUserDto, User>();
        //Product => UOM
        CreateMap<UnitOfMeasure, UnitOfMeasureDto>().ReverseMap();
        //Product => ProductGroup
        CreateMap<ProductGroup, ProductGroupDto>();
        CreateMap<CreateProductGroupDto, ProductGroup>();
        //Product => 
        CreateMap<Product, ProductDto>();
        CreateMap<CreateProductDto, Product>();

    }
}