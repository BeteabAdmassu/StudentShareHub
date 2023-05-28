using Microsoft.AspNetCore.Mvc;
using Backend.Model;
using Backend.Data;
using Backend.Model.Quiz;


namespace Backend.Controllers
{
    public class QuizController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public QuizController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/quiz
        [HttpGet]
        public ActionResult<IEnumerable<Quiz>> GetAllQuiz()
        {
            List<Quiz> quiz = _context.Quizzes.ToList();
            return Ok(quiz);
        }

        // GET: api/quiz/{id}
        [HttpGet("{id}")]
        public ActionResult<Quiz> GetQuizById(int id)
        {
            Quiz quiz = _context.Quizzes.FirstOrDefault(b => b.Id == id);
            if (quiz == null)
            {
                return NotFound();
            }

            return Ok(quiz);
        }
    }
}
