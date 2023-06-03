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
        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
           : base(options)
        {
        }

        public DbSet<BookModel> Books { get; set; }
        public DbSet<VideoModel> Videos { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<BookModel>()
                .HasOne(b => b.ApplicationUser)
                .WithMany(u => u.UserBooks)
                .HasForeignKey(b => b.ApplicationUserId);

            modelBuilder.Entity<VideoModel>()
                .HasOne(b => b.ApplicationUser)
                .WithMany(u => u.UserVideos)
                .HasForeignKey(b => b.ApplicationUserId);
        }
    }
}