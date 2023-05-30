﻿using Microsoft.AspNetCore.Mvc;
using Backend.Model;
using Backend.Data;
using Backend.Model.Quiz;
using Backend.Model.Video;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers
{
    public class QuizController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public QuizController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("UploadQuiz")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UploadQuiz([FromForm] QuizUploadModel quiz, List<Choice> choices, List<Question> questions)
        {


            
            if(ModelState.IsValid)
            {
                var _quiz = new Quiz
                {
                    Title = quiz.Title,
                    Explanation = quiz.Explanation,
                    Description = quiz.Description,
                    Duration = quiz.Duration,
                    Uploader="someone",
                    Year=2001,

                };


                _context.Quizzes.Add(_quiz);
                var choice = new Choice();
                var question=new Question();
                foreach (var _question in questions) {
                    question.answer = _question.answer;
                    question.question = _question.question;
                    question.quiz = _quiz;
          
                    _context.Questions.Add(question);
                    foreach (var _choice in choices)
                    {
                        choice.choice = _choice.choice;
                        choice.question = question
                        _context.Choices.Add(choice);
                    }
                }

                await _context.SaveChangesAsync();


                 return Ok(quiz);
            }
            return BadRequest();
        }
       /* [HttpPost]
        [Route("UploadQuiz")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]


                /*  private readonly ApplicationDbContext _context;

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
             */
            }
        }