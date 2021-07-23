using System;
using System.ComponentModel.DataAnnotations;

namespace StoreWorks.Models
{
    public class Sale
    {
        public int Id { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public int EmployeeId { get; set; }

        [Required]
        public int SaleQuantity { get; set; }

        [Required]
        public DateTime SaleDate { get; set; }

        [Required]
        public decimal SaleTotal { get; set; }
    }
}