using Microsoft.AspNetCore.Mvc;
using Backend.Model;
using Backend.Data;
using Backend.Model.Video;


namespace Backend.Controllers
{
    public class VideoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VideoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/video
        [HttpGet]
        public ActionResult<IEnumerable<Video>> GetAllVideo()
        {
            List<Video> video = _context.Videos.ToList();
            return Ok(video);
        }

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
    }
}
