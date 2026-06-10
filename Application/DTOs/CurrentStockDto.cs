public class CurrentStockDto
{
    public int ProductId { get; set; }
    public string ProductName { get; set; }

    public decimal Quantity { get; set; }

    public decimal AverageRate { get; set; }

    public decimal TotalValue { get; set; }
}