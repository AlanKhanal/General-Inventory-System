using Application.DTOs.Purchase;
using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class PurchaseService : IPurchaseService
    {
        private readonly IPurchaseRepository _repo;

        public PurchaseService(IPurchaseRepository repo)
        {
            _repo = repo;
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
    }
}