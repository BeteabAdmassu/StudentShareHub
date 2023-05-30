using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Model.Quiz
{
    public class Question
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]      
        public int QuestionId { get; set; }

        public string question { get; set; }

        public string answer { get; set; }

        public Quiz quiz { get; set; } 

    }
}
