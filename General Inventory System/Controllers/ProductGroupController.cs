using Application.DTOs;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/productgroup")]
    [Authorize]
    public class ProductGroupController : ControllerBase
    {
        private readonly IProductGroupService _service;

        public ProductGroupController(
            IProductGroupService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllAsync();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(
            CreateProductGroupDto dto)
        {
            var userId = int.Parse(
                User.FindFirst(
                    ClaimTypes.NameIdentifier
                )?.Value!
            );

            var result = await _service.CreateAsync(
                dto,
                userId
            );

            return Ok(result);
        }
    }
}