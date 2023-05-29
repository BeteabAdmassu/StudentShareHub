using Microsoft.AspNetCore.Mvc;
using Backend.Model;
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Backend.Model.Book;
using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Azure.Security.KeyVault.Certificates;

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

        // GET: api/books
        [HttpGet]
        public ActionResult<IEnumerable<Book>> GetAllBooks()
        {
            List<Book> books = _context.Books.ToList();
            return Ok(books);
        }

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
        // upload book to database
        [Route("UploadBook")]
        [HttpPost]
        public async Task<IActionResult> UploadBook([FromForm] Book book )
        {
            if (ModelState.IsValid)
            {
                var newBook = new Book {
                Title = book.Title,
                Author = book.Author,
                Description = book.Description,
                Department = book.Department,
                Year = book.Year,
                File = book.File,
                MaterialType = book.MaterialType,
                Id = book.Id,                
                };
           
                _context.Add<Book>(newBook);
                _context.SaveChanges();
                return Ok(newBook);
            }
            else { return NotFound(); }


        }



    }



}
    