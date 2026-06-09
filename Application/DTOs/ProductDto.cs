public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }

    public int ProductGroupId { get; set; }
    public int UnitOfMeasureId { get; set; }

    public bool IsActive { get; set; }
}