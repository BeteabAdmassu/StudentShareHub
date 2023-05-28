namespace Backend.Model.Book
{
    public class Book : BookUploadModel
    {
        public int Id { get; set; }
        public int Likes { get; set; } = 0;
        public int Views { get; set; } = 0;
        public bool Submitted { get; set; } = false;
        public string Date { get; set; }
        public List<Comment> Comments { get; set; } = new List<Comment>();
    }
}