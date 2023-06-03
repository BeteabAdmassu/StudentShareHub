using Microsoft.AspNetCore.Mvc;
using Backend.Model;
using Backend.Data;
using Backend.Model.Book;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Backend.Model.User;
using Microsoft.AspNetCore.StaticFiles;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public BooksController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("UploadBook")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UploadBook([FromForm] BookUploadModel model, [FromForm] IFormFile file)
        {
            if (ModelState.IsValid)
            {
                // Store the book file on the server
                var fileName = await StoreBookFile(file);
                var userEmail = User.FindFirstValue(ClaimTypes.Email);
                var user = await _userManager.FindByEmailAsync(userEmail);

                // Create a new Book entity
                var book = new BookModel
                {
                    Title = model.Title,
                    Description = model.Description,
                    Department = model.Department,
                    Year = model.Year,
                    email = userEmail,
                    Author = user.FirstName + " " + user.LastName,
                    authorProfilePic = GetProfilePictureUrl(user.ProfilePicture),
                    FilePath = fileName,
                    Course = model.Course,
                    Date = DateTime.Now.ToString("dd/mm/yyyy"),
                    ApplicationUserId = user.Id,
                    ApplicationUser = user
                };

                // Save the book to the database
                _context.Books.Add(book);
                await _context.SaveChangesAsync();

                return Ok(book.Id);
            }

            return BadRequest(ModelState);
        }

        private async Task<string> StoreBookFile(IFormFile file)
        {
            // Generate a unique file name or use the original file name if appropriate
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Assets\\Books", fileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return fileName;
        }

        private string GetFileUrl(string fileName)
        {
            if (string.IsNullOrEmpty(fileName))
            {
                return null;
            }

            var baseUrl = $"{Request.Scheme}://{Request.Host.Value}";
            var fileUrl = $"{baseUrl}/Assets/Books/{fileName}";

            return fileUrl;
        }

        // get book using email

        [HttpGet]
        [Route("GetBookByEmail")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ActionResult<IEnumerable<BookModel>> GetBookByEmail()
        {
            var userEmail = User.FindFirstValue(ClaimTypes.Email);
            List<BookModel> books = _context.Books.Where(b => b.email == userEmail).ToList();

            // Modify the file attribute of each book
            foreach (var book in books)
            {
                // Modify the file attribute using the desired logic
                book.FilePath = GetFileUrl(book.FilePath);
            }

            return Ok(books);
        }

        [HttpGet]
        [Route("GetBook")]
        public ActionResult<IEnumerable<BookModel>> GetAllBook([FromQuery] string department, [FromQuery] int year)
        {
            List<BookModel> books = _context.Books.Where(b => b.Department == department && b.Year == year && b.Submitted == true).ToList();
            // Modify the file attribute of each book
            foreach (var book in books)
            {
                // Modify the file attribute using the desired logic
                book.FilePath = GetFileUrl(book.FilePath);
            }
            return Ok(books);
        }

        //update book using id
        [HttpPut]
        [Route("UpdateBook")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UpdateBook([FromForm] BookUpdateModel model)
        {
            if (ModelState.IsValid)
            {
                var book = _context.Books.FirstOrDefault(b => b.Id == model.Id);
                var userEmail = User.FindFirstValue(ClaimTypes.Email);
                var user = await _userManager.FindByEmailAsync(userEmail);

                if (book == null)
                {
                    return NotFound();
                }
                // Store the book file on the server

                // Update the book entity
                book.Title = model.Title;
                book.Description = model.Description;
                book.Department = model.Department;
                book.Year = model.Year;
                book.Course = model.Course;
                book.ApplicationUser = user;
                // Save the book to the database
                _context.Books.Update(book);
                await _context.SaveChangesAsync();
                return Ok(book.Id);
            }
            return BadRequest(ModelState);
        }

        //delete book using id
        [HttpDelete]
        [Route("DeleteBook")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteBook([FromQuery] int id)
        {
            var book = _context.Books.FirstOrDefault(b => b.Id == id);
            if (book == null)
            {
                return NotFound();
            }
            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
            return Ok();
        }

        //update the submitted property of a book
        [HttpPut]
        [Route("SubmitBook")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> SubmitBook([FromQuery] int id)
        {
            var book = _context.Books.FirstOrDefault(b => b.Id == id);
            if (book == null)
            {
                return NotFound();
            }
            book.Submitted = !book.Submitted;
            _context.Books.Update(book);
            await _context.SaveChangesAsync();
            return Ok();
        }

        private string GetProfilePictureUrl(string fileName)
        {
            if (string.IsNullOrEmpty(fileName))
            {
                return null;
            }

            var baseUrl = $"{Request.Scheme}://{Request.Host.Value}";
            var profilePictureUrl = $"{baseUrl}/Assets/ProfilePics/{fileName}";

            return profilePictureUrl;
        }

        //Get all submitted books
        [HttpGet]
        [Route("GetAllBook")]
        public ActionResult<IEnumerable<BookModel>> GetAllSubmittedBooks()
        {
            List<BookModel> books = _context.Books.Where(b => b.Submitted == true).ToList();
            // Modify the file attribute of each book
            foreach (var book in books)
            {
                // Modify the file attribute using the desired logic
                book.FilePath = GetFileUrl(book.FilePath);
            }
            return Ok(books);
        }


        [HttpGet]
        [Route("DownloadBook")]
        public async Task<IActionResult> DownloadBook([FromQuery] string url)
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsByteArrayAsync();
                    var memory = new MemoryStream(content);
                    memory.Position = 0;

                    return File(memory, GetContentType(url), Path.GetFileName(url));
                }
                else
                {
                    // Handle error response
                    // You can return an appropriate IActionResult or throw an exception
                    return StatusCode((int)response.StatusCode);
                }
            }
        }

        private string GetContentType(string filePath)
        {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;
            if (!provider.TryGetContentType(filePath, out contentType))
            {
                contentType = "application/octet-stream";
            }
            return contentType;
        }
    }
}