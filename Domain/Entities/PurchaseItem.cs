namespace Domain.Entities
{
    public class PurchaseItem
    {
        public int Id { get; set; }

        public int PurchaseId { get; set; }
        public Purchase Purchase { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }

        public decimal Quantity { get; set; }

        public decimal PurchasePrice { get; set; }

        public decimal SalesPrice { get; set; }

        public decimal Total => Quantity * PurchasePrice;
    }
}