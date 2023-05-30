using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Model.Quiz
{
    public class QuizUploadModel
    {

        public string Title { get; set; }
        public string Explanation { get; set; }

        public string Description { get; set; }

        public string Duration { get; set; }


    }
}
