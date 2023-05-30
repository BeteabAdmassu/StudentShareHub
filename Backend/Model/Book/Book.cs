using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;

namespace Backend.Model.Book
{
    public class Book : BookUploadModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Author { get; set; }
        public int Likes { get; set; } = 0;
        public int Views { get; set; } = 0;
        public bool Submitted { get; set; } = false;
        public string MaterialType { get; set; } = "Book";
        public string FilePath { get; set; }
        public string Date { get; set; }
        public List<Comment>? Comments { get; set; } = new List<Comment>();
    }
}