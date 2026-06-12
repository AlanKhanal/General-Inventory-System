using System.ComponentModel.DataAnnotations;

namespace Application.DTOs
{
    public class CreateUnitOfMeasureDto
    {
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Code is required")]
        public string Code { get; set; }

        [Required(ErrorMessage = "Description is required")]
        public string Description { get; set; }
    }
}