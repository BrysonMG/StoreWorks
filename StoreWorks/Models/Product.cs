using System.ComponentModel.DataAnnotations;

namespace StoreWorks.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public string ProductName { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public decimal Cost { get; set; }

        [Required]
        public decimal SellPrice { get; set; }
    }
}
