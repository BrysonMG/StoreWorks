using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StoreWorks.Repositories.Interfaces;
using StoreWorks.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreWorks.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly ISalesRepo _salesRepo;

        public SalesController(ISalesRepo salesRepo)
        {
            _salesRepo = salesRepo;
        }

        [HttpGet]
        public IActionResult GetAllSales()
        {
            return Ok(_salesRepo.GetAllSales());
        }

        [HttpPost]
        public IActionResult AddSale(Sale sale)
        {
            _salesRepo.AddSale(sale);
            return CreatedAtAction("GetAllSales", new { id = sale.Id }, sale);
        }
    }
}
