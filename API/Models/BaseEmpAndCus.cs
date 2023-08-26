using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class BaseEmpAndCus
    {
        public string Id { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        [EmailAddress]
        public string Email { get; set; } = null!;
        public string Picture { get; set; } = null!;
    }
}