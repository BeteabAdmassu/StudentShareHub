using Microsoft.AspNetCore.Mvc;
using Backend.Model;
using Backend.Data;
using Backend.Model.Book;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BooksController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("UploadBook")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UploadBook([FromForm] BookUploadModel model, [FromForm] IFormFile file)
        {
            if (ModelState.IsValid)
            {
                // Store the book file on the server
                var filePath = await StoreBookFile(file);
                var userEmail = User.FindFirstValue(ClaimTypes.Email);

                // Create a new Book entity
                var book = new Book
                {
                    Title = model.Title,
                    Description = model.Description,
                    Department = model.Department,
                    Year = model.Year,
                    Author = userEmail,
                    FilePath = filePath,
                    Course = model.Course,
                    Date = DateTime.Now.ToString("dd/mm/yyyy")
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
            var fileName = GetUniqueFileName(file.FileName);
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Assets/Books", file.FileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return filePath;
        }

        private string GetUniqueFileName(string fileName)
        {
            // Generate a unique file name based on your requirements
            var uniqueFileName = Guid.NewGuid().ToString("N") + "_" + fileName;
            return uniqueFileName;
        }

        [HttpGet]
        [Route("GetAllBooks")]
        public ActionResult<IEnumerable<Book>> GetAllBooks()
        {
            List<Book> books = _context.Books.ToList();
            return Ok(books);
        }















        /*
          // GET: api/books
          [HttpGet]
          public ActionResult<IEnumerable<Book>> GetAllBooks()
          {
              List<Book> books = _context.Books.ToList();
              return Ok(books);
          }

          // GET: api/books/{id}
          [HttpGet("{id}")]
          public ActionResult<Book> GetBookById(int id)
          {
              Book book = _context.Books.FirstOrDefault(b => b.Id == id);
              if (book == null)
              {
                  return NotFound();
              }

              return Ok(book);
         }
       */
    }
}