namespace Application.DTOs.Purchase
{
    public class PurchaseDto
    {
        public int Id { get; set; }

        public string VendorName { get; set; }

        public DateTime PurchaseDate { get; set; }

        public decimal TotalAmount { get; set; }

        public List<PurchaseItemDto> Items { get; set; }
    }
}