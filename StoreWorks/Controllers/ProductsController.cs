using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StoreWorks.Models;
using StoreWorks.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreWorks.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsRepo _productsRepo;

        public ProductsController(IProductsRepo productsRepo)
        {
            _productsRepo = productsRepo;
        }

        [HttpGet]
        public IActionResult GetAllProducts()
        {
            return Ok(_productsRepo.GetAllProducts());
        }

        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            Product product = _productsRepo.GetProductById(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpPost]
        public IActionResult AddProduct(Product product)
        {
            _productsRepo.AddProduct(product);
            return CreatedAtAction("GetAllProducts", new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }
            _productsRepo.EditProduct(product);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            _productsRepo.DeleteProduct(id);
            return NoContent();
        }
    }
}
