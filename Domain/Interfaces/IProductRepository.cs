using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IProductRepository
    {
        Task AddAsync(Product entity);

        Task<List<Product>> GetAllAsync();

        Task<Product?> GetByIdAsync(int id);

        Task SaveChangesAsync();

        //StockNew
        Task<List<PurchaseItem>> GetPurchaseItemsAsync();
        Task<List<Product>> GetProductsAsync();
    }
}