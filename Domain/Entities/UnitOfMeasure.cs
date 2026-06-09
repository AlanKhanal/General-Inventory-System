namespace Domain.Entities
{
    public class UnitOfMeasure
    {
        public int Id { get; set; }

        public string Name { get; set; }   // Kilogram, Liter, Piece

        public string Code { get; set; }   // KG, L, PC

        public string? Description { get; set; }

        public bool IsActive { get; set; } = true;

        public int CreatedByUserId { get; set; }

        public User CreatedByUser { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}