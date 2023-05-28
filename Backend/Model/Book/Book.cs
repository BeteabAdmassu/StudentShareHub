namespace Backend.Model.Book
{
    public class Book
    {
        public int Id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string department { get; set; }

        public int year { get; set; }
        public string course { get; set; }
    }
}
