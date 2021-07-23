using System.ComponentModel.DataAnnotations;

namespace StoreWorks.Models
{
    public class Employee
    {
        public int Id { get; set; }

        [Required]
        public string FirebaseUserId { get; set; }

        [Required]
        public string EmployeeName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public bool CanManage { get; set; }
    }
}
