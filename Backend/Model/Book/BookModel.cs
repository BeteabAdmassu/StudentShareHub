using Backend.Model.User;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Model.Book
{
    public class BookModel : BookUploadModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string email { get; set; }
        public string? authorProfilePic { get; set; }
        public string Author { get; set; }
        public int Likes { get; set; } = 0;
        public int Views { get; set; } = 0;
        public bool Submitted { get; set; } = false;
        public string FilePath { get; set; }
        public string MaterialType { get; set; } = "Book";
        public string Date { get; set; }
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public List<Comment>? Comments { get; set; } = new List<Comment>();
    }
}