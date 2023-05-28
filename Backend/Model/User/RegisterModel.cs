using System.ComponentModel.DataAnnotations;

namespace Backend.Model.User
{
    public class RegisterModel
    {
        /*   public string FirstName { get; set; }
           public string LastName { get; set; }
           public string Email { get; set; }
           public string Password { get; set; }*/

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {2} characters long.", MinimumLength = 2)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {2} characters long.", MinimumLength = 2)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}