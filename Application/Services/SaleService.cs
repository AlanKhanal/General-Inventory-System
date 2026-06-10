using Application.DTOs.Sale;
using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class SaleService : ISaleService
    {
        private readonly ISaleRepository _repo;
        private readonly IProductRepository _productRepo;

        public SaleService(
            ISaleRepository repo,
            IProductRepository productRepo)
        {
            _repo = repo;
            _productRepo = productRepo;
        }

        public async Task<int> CreateSaleAsync(CreateSaleDto dto, int userId)
        {
            var sale = new Sale
            {
                CustomerId = dto.CustomerId,
                CreatedByUserId = userId,
                SaleDate = DateTime.UtcNow,
                Items = new List<SaleItem>()
            };

            decimal total = 0;

            foreach (var item in dto.Items)
            {
                var product = await _productRepo.GetByIdAsync(item.ProductId);

                if (product == null)
                    throw new Exception("Product not found");

                if (product.Quantity < item.Quantity)
                    throw new Exception("Insufficient stock");

                var saleItem = new SaleItem
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    SalesPrice = item.SalesPrice,
                    TotalAmount = item.Quantity * item.SalesPrice
                };

                product.Quantity -= item.Quantity; //  STOCK DECREASE

                sale.Items.Add(saleItem);

                total += saleItem.TotalAmount;
            }

            sale.TotalAmount = total;

            await _repo.AddAsync(sale);
            await _repo.SaveChangesAsync();

            return sale.Id;
        }
    }
}