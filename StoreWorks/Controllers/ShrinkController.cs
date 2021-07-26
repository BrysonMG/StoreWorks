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
    public class ShrinkController : ControllerBase
    {
        private readonly IShrinkRepo _shrinkRepo;

        public ShrinkController(IShrinkRepo shrinkRepo)
        {
            _shrinkRepo = shrinkRepo;
        }

        [HttpGet]
        public IActionResult GetAllShrink()
        {
            return Ok(_shrinkRepo.GetAllShrink());
        }

        [HttpPost]
        public IActionResult AddShrink(Shrink shrink)
        {
            _shrinkRepo.AddShrink(shrink);
            return CreatedAtAction("GetAllShrink", new { id = shrink.Id }, shrink);
        }
    }
}
