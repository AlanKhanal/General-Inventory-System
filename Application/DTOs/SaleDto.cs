namespace Application.DTOs.Sale
{
    public class SaleDto
    {
        public int Id { get; set; }
        public int? CustomerId { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime SaleDate { get; set; }

        public List<SaleItemDto> Items { get; set; }
    }
}