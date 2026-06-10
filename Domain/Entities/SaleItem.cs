namespace Domain.Entities
{
    public class SaleItem
    {
        public int Id { get; set; }

        public int SaleId { get; set; }
        public Sale Sale { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }

        public decimal Quantity { get; set; }

        // USER CAN CHANGE PRICE WHILE SELLING
        public decimal SalesPrice { get; set; }

        public decimal TotalAmount { get; set; }
    }
}