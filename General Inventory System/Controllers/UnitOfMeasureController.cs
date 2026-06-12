using Application.DTOs;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[ApiController]
[Route("api/unitofmeasure")]
[Authorize]
public class UnitOfMeasureController : ControllerBase
{
    private readonly IUnitOfMeasureService _service;

    public UnitOfMeasureController(IUnitOfMeasureService service)
    {
        _service = service;
    }

[HttpGet]
public async Task<IActionResult> GetAll()
{
    var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

    int userId = int.Parse(userIdClaim);

    var result = await _service.GetAllAsync();

    return Ok(new
    {
        data = result,
        userId = userId
    });
}
    [HttpPost]
    public async Task<IActionResult> Create(CreateUnitOfMeasureDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var userId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)?.Value
        );

        var result = await _service.CreateAsync(dto, userId);

        return Ok(result);
    }
}