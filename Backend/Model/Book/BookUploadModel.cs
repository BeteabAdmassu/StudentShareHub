namespace Backend.Model.Book
{
    public class BookUploadModel
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string Department { get; set; }
        public int Year { get; set; }
        public string File { get; set; }
        public string MaterialType { get; set; }
    }
}