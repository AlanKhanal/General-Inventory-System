namespace Domain.Entities
{
    public class Sale
    {
        public int Id { get; set; }

        // OPTIONAL CUSTOMER
        public int? CustomerId { get; set; }
        public Customer? Customer { get; set; }

        public DateTime SaleDate { get; set; } = DateTime.UtcNow;

        public decimal TotalAmount { get; set; }

        // USER WHO CREATED SALE
        public int CreatedByUserId { get; set; }
        public User CreatedByUser { get; set; }

        // MULTIPLE ITEMS
        public ICollection<SaleItem> Items { get; set; }
            = new List<SaleItem>();
    }

}