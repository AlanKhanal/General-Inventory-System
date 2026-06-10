using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

public class ProductService : IProductService
{
    private readonly IProductRepository _repo;
    private readonly IMapper _mapper;

    public ProductService(IProductRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<ProductDto> CreateAsync(CreateProductDto dto, int userId)
    {
        var product = new Product
        {
            Name = dto.Name,
            Description = dto.Description,
            ProductGroupId = dto.ProductGroupId,
            UnitOfMeasureId = dto.UnitOfMeasureId,
            CreatedByUserId = userId
        };

        await _repo.AddAsync(product);
        await _repo.SaveChangesAsync();

        return _mapper.Map<ProductDto>(product);
    }

    public async Task<List<ProductDto>> GetAllAsync()
    {
        var data = await _repo.GetAllAsync();
        return _mapper.Map<List<ProductDto>>(data);
    }
    public async Task<ProductDto?> GetByIdAsync(int id)
    {
        var product = await _repo.GetByIdAsync(id);

        if (product == null)
            return null;

        return _mapper.Map<ProductDto>(product);
    }
    public async Task UpdateAsync(int id, CreateProductDto dto)
    {
        var product = await _repo.GetByIdAsync(id);

        if (product == null)
            throw new Exception("Product not found");

        product.Name = dto.Name;
        product.Description = dto.Description;
        product.ProductGroupId = dto.ProductGroupId;
        product.UnitOfMeasureId = dto.UnitOfMeasureId;

        await _repo.SaveChangesAsync();
    }
    public async Task<List<ProductDto>> GetStockAsync()
    {
        var data = await _repo.GetAllAsync();
        return _mapper.Map<List<ProductDto>>(data);
    }


    //stocknew
    public async Task<List<CurrentStockDto>> GetCurrentStockAsync()
    {
        var products = await _repo.GetProductsAsync();
        var purchaseItems = await _repo.GetPurchaseItemsAsync();

        var result = new List<CurrentStockDto>();

        foreach (var product in products)
        {
            var productPurchases = purchaseItems
                .Where(x => x.ProductId == product.Id)
                .ToList();

            decimal totalQty = 0;
            decimal totalValue = 0;

            foreach (var item in productPurchases)
            {
                totalQty += item.Quantity;
                totalValue += item.Quantity * item.PurchasePrice;
            }

            decimal avgRate = totalQty == 0 ? 0 : totalValue / totalQty;

            result.Add(new CurrentStockDto
            {
                ProductId = product.Id,
                ProductName = product.Name,
                Quantity = product.Quantity,
                AverageRate = avgRate,
                TotalValue = avgRate * product.Quantity
            });
        }

        return result;
    }
}