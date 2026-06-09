namespace Domain.Entities
{
    public class Purchase
    {
        public int Id { get; set; }

        public int VendorId { get; set; }
        public Vendor Vendor { get; set; }

        public DateTime PurchaseDate { get; set; } = DateTime.UtcNow;

        public decimal TotalAmount { get; set; }

        public int CreatedByUserId { get; set; }
        public User CreatedByUser { get; set; }

        public List<PurchaseItem> Items { get; set; } = new();
    }
}