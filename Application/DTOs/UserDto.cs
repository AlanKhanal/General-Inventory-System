namespace Application.DTOs;

public record UserDto(
    int Id,
    string Name,
    string Email,
    string MobileNo,
    bool IsActive
);