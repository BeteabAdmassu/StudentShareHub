using System.ComponentModel.DataAnnotations;

namespace Backend.Model.Book
{
    public class Book : BookUploadModel
    {
        [Key]
        public int Id { get; set; }
        public string Author { get; set; }
        public int Likes { get; set; } = 0;
        public int Views { get; set; } = 0;
        public bool Submitted { get; set; } = false;
        public string MaterialType { get; set; }
        public string Date { get; set; }
        public List<Comment>? Comments { get; set; } = new List<Comment>();
    }
}