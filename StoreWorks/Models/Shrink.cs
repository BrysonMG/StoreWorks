using System;
using System.ComponentModel.DataAnnotations;

namespace StoreWorks.Models
{
    public class Shrink
    {
        public int Id { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public int EmployeeId { get; set; }

        [Required]
        public int ShrinkQuantity { get; set; }

        [Required]
        public DateTime ShrinkDate { get; set; }

        [Required]
        public decimal ShrinkTotal { get; set; }
    }
}