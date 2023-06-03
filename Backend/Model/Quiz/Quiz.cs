using Backend.Model.Book;

namespace Backend.Model.Quiz
{
    public class Quiz
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Question { get; set; }
        public string CorrectAnswer { get; set; }
        public string Explanation { get; set; }

        public string Description { get; set; }

        public string Department { get; set; }

        public int Year { get; set; }

        public string Username { get; set; }

        public int Likes { get; set; } = 0;

        public int views { get; set; } = 0;

        public string MaterialType { get; set; }

        public DateOnly Date { get; set; }

        public string? File { get; set; }

        public Comment[] Comments { get; set; }
    }
}