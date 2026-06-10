using Application.DTOs.Purchase;
using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class PurchaseService : IPurchaseService
    {
        private readonly IPurchaseRepository _repo;
        private readonly IProductRepository _productRepo;

        public PurchaseService(
            IPurchaseRepository repo,
            IProductRepository productRepo)
        {
            _repo = repo;
            _productRepo = productRepo;
        }

        public async Task<int> CreatePurchaseAsync(CreatePurchaseDto dto, int userId)
        {
            // 1. Create Purchase header
            var purchase = new Purchase
            {
                VendorId = dto.VendorId,
                CreatedByUserId = userId,
                PurchaseDate = DateTime.UtcNow,
                Items = new List<PurchaseItem>()
            };

            decimal total = 0;

            // 2. Add items
            foreach (var item in dto.Items)
            {
                var product = await _productRepo.GetByIdAsync(item.ProductId);

                if (product == null)
                    throw new Exception("Product not found");

                //  STEP 2: INCREASE STOCK HERE
                product.Quantity += item.Quantity;

                var purchaseItem = new PurchaseItem
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    PurchasePrice = item.PurchasePrice,
                    SalesPrice = item.SalesPrice
                };

                total += item.Quantity * item.PurchasePrice;

                purchase.Items.Add(purchaseItem);
            }

            // 3. Set total
            purchase.TotalAmount = total;

            // 4. Save
            await _repo.AddAsync(purchase);
            await _repo.SaveChangesAsync();

            return purchase.Id;
        }
        public async Task<List<PurchaseDto>> GetAllAsync()
        {
            var purchases = await _repo.GetAllAsync();

            return purchases.Select(p => new PurchaseDto
            {
                Id = p.Id,
                VendorName = p.Vendor.Name,
                PurchaseDate = p.PurchaseDate,
                TotalAmount = p.TotalAmount,
                Items = p.Items.Select(i => new PurchaseItemDto
                {
                    ProductName = i.Product.Name,
                    Quantity = i.Quantity,
                    PurchasePrice = i.PurchasePrice,
                    SalesPrice = i.SalesPrice
                }).ToList()
            }).ToList();
        }
        public async Task<PurchaseDto?> GetByIdAsync(int id)
        {
            var p = await _repo.GetByIdAsync(id);

            if (p == null)
                return null;

            return new PurchaseDto
            {
                Id = p.Id,
                VendorName = p.Vendor.Name,
                PurchaseDate = p.PurchaseDate,
                TotalAmount = p.TotalAmount,
                Items = p.Items.Select(i => new PurchaseItemDto
                {
                    ProductName = i.Product.Name,
                    Quantity = i.Quantity,
                    PurchasePrice = i.PurchasePrice,
                    SalesPrice = i.SalesPrice
                }).ToList()
            };
        }
    }
}