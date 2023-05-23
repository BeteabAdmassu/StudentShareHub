using Backend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Backend.Configurations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Backend.Data;

namespace Backend.ControllersBase
{
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly JwtConfig _jwtConfig;

        public UserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, JwtConfig jwtConfig)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtConfig = jwtConfig;
        }

        // Registeration Action
        [HttpPost]
        [Route("Signup")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            // Validate the input model
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Create a new user in your user repository or database
            var user = new ApplicationUser
            {
                LastName = model.LastName,
                FirstName = model.FirstName,
                UserName = model.Email,
                Email = model.Email
            };

            // Use the appropriate user management service to create the user
            var result = await _userManager.CreateAsync(user, model.Password);

            // Check if user creation was successful
            if (result.Succeeded)
            {
                user.PasswordHash = null;
                return Ok();
            }
            else
            {
                // Handle failed user creation
                return BadRequest(result.Errors);
            }
        }

        // Login Action
        [HttpPost]
        [Route("Signin")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);

                if (result.Succeeded)
                {
                    var user = await _userManager.FindByNameAsync(model.Email);
                    var token = GenerateJwtToken(user);
                    return Ok(new { Token = token });
                }
                else
                {
                    return Unauthorized();
                }
            }
            return BadRequest(ModelState);
        }

        // Logout Action

        [HttpPost]
        [Route("Signout")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Logout()
        {
            return Ok();
        }

        [HttpGet]
        [Route("GetUser")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetUser()
        {
            var userEmail = User.FindFirstValue(ClaimTypes.Email);
            var user = await _userManager.FindByEmailAsync(userEmail);
            // Create a UserInfo object to hold the user information

            if (user == null)
            {
                // User not found
                return NotFound();
            }

            var userInfo = new ApplicationUser
            {
                UserName = user.UserName,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Department = user.Department,
                Year = user.Year,
                ProfilePicture = GetProfilePictureUrl(user.ProfilePicture)
            };
            return Ok(userInfo);
        }

        private string GetProfilePictureUrl(string fileName)
        {
            if (string.IsNullOrEmpty(fileName))
            {
                return null;
            }

            var baseUrl = $"{Request.Scheme}://{Request.Host.Value}";
            var profilePictureUrl = $"{baseUrl}/Assets/{fileName}";

            return profilePictureUrl;
        }

        [HttpPut]
        [Route("UpdateUser")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UpdateUser([FromForm] ApplicationUser model)
        {
            var userEmail = User.FindFirstValue(ClaimTypes.Email);
            var user = await _userManager.FindByEmailAsync(userEmail);
            // Create a UserInfo object to hold the user information
            if (user == null)
            {
                // User not found
                return NotFound();
            }

            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Department = model.Department;
            user.Year = model.Year;

            if (Request.Form.Files.Count > 0)
            {
                var profilePicture = Request.Form.Files[0];
                if (profilePicture.Length > 0)
                {
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(profilePicture.FileName);
                    //var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", fileName);
                    //var filePath = @"C:\Books\Web\Asp.net\StudentShareHubApi\StudentShareHubApi\Assets" + fileName;

                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Assets", fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await profilePicture.CopyToAsync(stream);
                    }
                    user.ProfilePicture = fileName;
                }
            }

            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        // Token Generation
        private string GenerateJwtToken(ApplicationUser user)
        {
            var key = Encoding.ASCII.GetBytes(_jwtConfig.SecretKey);
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                // Issuer = _jwtConfig.Issuer,
                // Audience = _jwtConfig.Audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}