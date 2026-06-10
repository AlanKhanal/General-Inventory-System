namespace Application.DTOs.Sale
{
    public class SaleItemDto
    {
        public int ProductId { get; set; }
        public decimal Quantity { get; set; }
        public decimal SalesPrice { get; set; }
        public decimal TotalAmount { get; set; }
    }
}