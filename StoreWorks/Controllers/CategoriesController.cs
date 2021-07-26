using Microsoft.AspNetCore.Authorization;
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
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoriesRepo _categoriesRepo;

        public CategoriesController(ICategoriesRepo categoriesRepo)
        {
            _categoriesRepo = categoriesRepo;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_categoriesRepo.GetAllCategories());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            Category ctg = _categoriesRepo.GetCategoryById(id);
            if (ctg == null)
            {
                return NotFound();
            }
            return Ok(ctg);
        }
    }
}
