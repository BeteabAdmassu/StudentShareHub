using Backend.Model.Book;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Model.Video
{
    public class Video:VideoUploadModel
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Author { get; set; }

        public int Likes { get; set; } = 0;

        public int views { get; set; } = 0;

        public string MaterialType { get; set; }="Video";

        public string Date { get; set; }

        public Comment[] Comments { get; set; }
    }
}