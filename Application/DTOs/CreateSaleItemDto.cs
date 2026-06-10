namespace Application.DTOs.Sale
{
    public class CreateSaleItemDto
    {
        public int ProductId { get; set; }

        public decimal Quantity { get; set; }

        public decimal SalesPrice { get; set; }
    }
}