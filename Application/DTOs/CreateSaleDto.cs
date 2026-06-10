using System.Collections.Generic;

namespace Application.DTOs.Sale
{
    public class CreateSaleDto
    {
        // OPTIONAL CUSTOMER
        public int? CustomerId { get; set; }

        public List<CreateSaleItemDto> Items { get; set; }
    }
}