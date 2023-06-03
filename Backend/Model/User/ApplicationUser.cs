using Microsoft.AspNetCore.Identity;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Model.Book;
using Backend.Model.Video;

namespace Backend.Model.User
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Department { get; set; }

        public int Year { get; set; }

        public string? ProfilePicture { get; set; }

        public List<BookModel> UserBooks { get; set; } = new List<BookModel>();
        public List<VideoModel> UserVideos { get; set; } = new List<VideoModel>();

        public ApplicationUser()
        {
            Department = "Computer Science";
            Year = 1;
        }
    }
}