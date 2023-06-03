namespace Backend.Model.Book
{
    public class BookUpdateModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Department { get; set; }
        public int Year { get; set; }
        public string Course { get; set; }
    }
}