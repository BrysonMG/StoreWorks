using System;
using System.ComponentModel.DataAnnotations;

namespace StoreWorks.Models
{
    public class Received
    {
        public int Id { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public int EmployeeId { get; set; }

        [Required]
        public int ReceivedQuantity { get; set; }

        [Required]
        public DateTime ReceivedDate { get; set; }

        [Required]
        public decimal ReceivedTotal { get; set; }
    }
}
