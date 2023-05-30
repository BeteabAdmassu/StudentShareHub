using Microsoft.AspNetCore.Mvc;
using Backend.Model;
using Backend.Data;
using Backend.Model.Video;
using Backend.Model.Book;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VideoController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        [Route("UploadVideo")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UploadVideo([FromForm] VideoUploadModel model)
        {


            if (ModelState.IsValid)
            {
                // Create a new Video entity
                var video = new Video
                {
                    Title = model.Title,
                    Description = model.Description,
                    Department = model.Department,
                    Year = model.Year,
                    VideoUrl = model.VideoUrl,
                    Course = model.Course,
                    Author = "mockAuthor",
                    Date= DateTime.Now.ToString("dd/MM/yyyy")
                }; 

                // Save the book to the database
                _context.Videos.Add(video);
                await _context.SaveChangesAsync();

                return Ok(video.Id);
            }

            return BadRequest(ModelState);
        }
        
 
        [HttpGet]
        [Route("GetTopTen")]
        public ActionResult<IEnumerable<Video>> GetTopTen()
        {
            List<Video> video = _context.Videos.OrderByDescending(b => b.views).Take(10).ToList();
            return Ok(video);
        }
           // GET: api/video
         [HttpGet]
        [Route("GetAllVideos")]
         public ActionResult<IEnumerable<Video>> GetAllVideos()
         {
             List<Video> video = _context.Videos.ToList();
             return Ok(video);
         }
        /*
         // GET: api/video/{id}
         [HttpGet("{id}")]
         public ActionResult<Video> GetVideoById(int id)
         {
             Video video = _context.Videos.FirstOrDefault(b => b.Id == id);
             if (video == null)
             {
                 return NotFound();
             }

             return Ok(video);
         }
        */
    }
}