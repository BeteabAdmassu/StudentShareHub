using Microsoft.AspNetCore.Mvc;
using Backend.Model;
using Backend.Data;
using Backend.Model.Video;
using Backend.Model.Book;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Backend.Model.User;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public VideoController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("UploadVideo")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UploadVideo([FromForm] VideoUploadModel model)
        {
            if (ModelState.IsValid)
            {
                var userEmail = User.FindFirstValue(ClaimTypes.Email);
                var user = await _userManager.FindByEmailAsync(userEmail);
                // Create a new Video entity
                var video = new VideoModel
                {
                    Title = model.Title,
                    Description = model.Description,
                    Department = model.Department,
                    Year = model.Year,
                    VideoUrl = model.VideoUrl,
                    Course = model.Course,
                    email = userEmail,
                    Author = user.FirstName + " " + user.LastName,
                    authorProfilePic = GetProfilePictureUrl(user.ProfilePicture),
                    Date = DateTime.Now.ToString("dd/MM/yyyy"),
                    ApplicationUserId = user.Id,
                    ApplicationUser = user
                };

                // Save the book to the database
                _context.Videos.Add(video);
                await _context.SaveChangesAsync();

                return Ok(video.Id);
            }

            return BadRequest(ModelState);
        }

        //getallvideo by department and year form parameter sorted by date
        [HttpGet]
        [Route("GetVideo")]
        public ActionResult<IEnumerable<VideoModel>> GetAllVideo([FromQuery] string department, [FromQuery] int year)
        {
            List<VideoModel> videos = _context.Videos.Where(b => b.Department == department && b.Year == year && b.Submitted == true).OrderByDescending(b => b.Date).ToList();

            return Ok(videos);
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

        //Get video using email

        [HttpGet]
        [Route("GetVideoByEmail")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ActionResult<IEnumerable<VideoModel>> GetVideoByEmail()
        {
            var userEmail = User.FindFirstValue(ClaimTypes.Email);
            List<VideoModel> videos = _context.Videos.Where(b => b.email == userEmail).OrderByDescending(b => b.Date).ToList();
            return Ok(videos);
        }

    

        //update video
        [HttpPut]
        [Route("UpdateVideo")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UpdateVideo([FromForm] VideoUpdateModel model)
        {
            if (ModelState.IsValid)
            {
                var video = _context.Videos.FirstOrDefault(b => b.Id == model.Id);
                var userEmail = User.FindFirstValue(ClaimTypes.Email);
                var user = await _userManager.FindByEmailAsync(userEmail);

                if (video == null)
                {
                    return NotFound();
                }
                video.Title = model.Title;
                video.Description = model.Description;
                video.Department = model.Department;
                video.Year = model.Year;
                video.Course = model.Course;
                video.ApplicationUser = user;

                await _context.SaveChangesAsync();
                return Ok(video.Id);
            }
            return BadRequest(ModelState);
        }

        //Update the submitted property of a video
        [HttpPut]
        [Route("SubmitVideo")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UpdateVideoSubmitted([FromQuery] int id)
        {
            var video = _context.Videos.FirstOrDefault(b => b.Id == id);

            if (video == null)
            {
                return NotFound();
            }
            video.Submitted = !video.Submitted;
            _context.Videos.Update(video);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // delete video
        [HttpDelete]
        [Route("DeleteVideo")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteVideo([FromQuery] int id)
        {
            var video = _context.Videos.FirstOrDefault(b => b.Id == id);
            if (video == null)
            {
                return NotFound();
            }
            _context.Videos.Remove(video);
            await _context.SaveChangesAsync();
            return Ok(video.Id);
        }

        //Get all submitted videos
        [HttpGet]
        [Route("GetAllVideo")]
        public ActionResult<IEnumerable<VideoModel>> GetAllSubmittedVideos()
        {
            List<VideoModel> videos = _context.Videos.Where(b => b.Submitted == true).OrderByDescending(b => b.Date).ToList();
            return Ok(videos);
        }
    }
}