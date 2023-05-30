
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Model.Quiz
{
    public class Quiz:QuizUploadModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int QuizId { get; set; }
      
        public int Year { get; set; }

        public string Uploader { get; set; }

        public int Likes { get; set; } = 0;

        public int views { get; set; } = 0;

        public string MaterialType { get; set; } = "Quiz";

        public string Date { get; set; } = DateTime.Now.ToString("MM/dd/yyyy");


    }
}