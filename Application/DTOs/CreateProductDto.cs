public class CreateProductDto
{
    public string Name { get; set; }
    public string? Description { get; set; }

    public int ProductGroupId { get; set; }
    public int UnitOfMeasureId { get; set; }
}