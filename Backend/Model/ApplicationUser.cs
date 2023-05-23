using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;

namespace Backend.Model
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Department { get; set; }

        public int Year { get; set; }

        public string? ProfilePicture { get; set; }

        public ApplicationUser()
        {
            Department = "Computer science";
            Year = 1;
        }
    }
}