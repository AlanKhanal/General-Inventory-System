using System.Collections.Generic;

namespace Application.DTOs.Purchase
{
    public class CreatePurchaseDto
    {
        public int VendorId { get; set; }

        public List<CreatePurchaseItemDto> Items { get; set; }
    }
}