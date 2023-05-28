namespace Backend.Model.Quiz
{
    public class Quiz
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string[] Answers { get; set; }
        public int CorrectAnswer { get; set; }
        public string Explanation { get; set; }
        public string[] Tags { get; set; }
    }
}