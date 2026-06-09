using Application.DTOs.Purchase;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PurchaseController : ControllerBase
    {
        private readonly IPurchaseService _service;

        public PurchaseController(IPurchaseService service)
        {
            _service = service;
        }

        // =========================
        // CREATE PURCHASE
        // =========================
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePurchaseDto dto)
        {
            if (dto == null || dto.Items == null || !dto.Items.Any())
                return BadRequest("Purchase must contain items.");

            // Get logged-in user id from JWT token
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdClaim))
                return Unauthorized("User not found in token.");

            int userId = int.Parse(userIdClaim);

            var purchaseId = await _service.CreatePurchaseAsync(dto, userId);

            return Ok(new
            {
                message = "Purchase created successfully",
                purchaseId
            });
        }
    }
}