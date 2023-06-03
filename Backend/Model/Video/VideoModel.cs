using Backend.Model.Book;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Backend.Model.User;

namespace Backend.Model.Video
{
    public class VideoModel : VideoUploadModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string? authorProfilePic { get; set; }
        public string email { get; set; }
        public string Author { get; set; }
        public int Likes { get; set; } = 0;
        public int views { get; set; } = 0;
        public bool Submitted { get; set; } = false;
        public string MaterialType { get; set; } = "Video";
        public string Date { get; set; }
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public Comment[] Comments { get; set; }
    }
}