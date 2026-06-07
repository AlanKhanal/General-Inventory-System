using Application.DTOs;

namespace Application.Interfaces;

public interface IUserService
{
    Task<UserDto> RegisterAsync(CreateUserDto dto);
    Task<string?> LoginAsync(LoginDto dto); // returns JWT token
}