namespace Application.DTOs.Purchase
{
    public class CreatePurchaseItemDto
    {
        public int ProductId { get; set; }
        public decimal Quantity { get; set; }
        public decimal PurchasePrice { get; set; }
        public decimal SalesPrice { get; set; }
    }
}