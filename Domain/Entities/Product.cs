namespace Domain.Entities
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }

        // FK => Product Group (REQUIRED)
        public int ProductGroupId { get; set; }
        public ProductGroup ProductGroup { get; set; }

        // FK => Unit of Measure
        public int UnitOfMeasureId { get; set; }
        public UnitOfMeasure UnitOfMeasure { get; set; }

        // Status
        public bool IsActive { get; set; } = true;

        // Audit
        public int CreatedByUserId { get; set; }
        public User CreatedByUser { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}