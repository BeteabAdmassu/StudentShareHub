using Backend.Model.Book;
using Backend.Model.Quiz;
using Backend.Model.User;
using Backend.Model.Video;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
           : base(options)
        {
        }

        // Add your DbSets here
        // public DbSet<Quiz> Quizzes { get; set; }

        public DbSet<Book> Books { get; set; }
        //  public DbSet<Video> videos { get; set; }
    }
}