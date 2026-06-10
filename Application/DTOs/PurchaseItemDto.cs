namespace Application.DTOs.Purchase
{
    public class PurchaseItemDto
    {
        public string ProductName { get; set; }

        public decimal Quantity { get; set; }

        public decimal PurchasePrice { get; set; }

        public decimal SalesPrice { get; set; }
    }
}