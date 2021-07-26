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
    public class ReceivedController : ControllerBase
    {
        private readonly IReceivedRepo _receivedRepo;

        public ReceivedController(IReceivedRepo receivedRepo)
        {
            _receivedRepo = receivedRepo;
        }

        [HttpGet]
        public IActionResult GetAllReceived()
        {
            return Ok(_receivedRepo.GetAllReceived());
        }

        [HttpPost]
        public IActionResult AddReceived(Received received)
        {
            _receivedRepo.AddReceived(received);
            return CreatedAtAction("GetAllReceived", new { id = received.Id }, received);
        }
    }
}
