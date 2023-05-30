namespace Backend.Model.Quiz
{
    public class QuizUploadModel
    {
        public List<string> Question { get; set; }
        public List<string> Choices { get; set; }
    
        public string CorrectAnswer { get; set; }
        public string Explanation { get; set; }

        public string Description { get; set; }

        public string Duration { get; set; }
    }
}
