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
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeesRepo _employeesRepo;

        public EmployeesController(IEmployeesRepo employeesRepo)
        {
            _employeesRepo = employeesRepo;
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            return Ok(_employeesRepo.GetAllEmployees());
        }

        [Authorize]
        [HttpGet("{firebaseId}")]
        public IActionResult GetEmployee(string firebaseId)
        {
            return Ok(_employeesRepo.GetEmployeeByFirebaseId(firebaseId));
        }

        [Authorize]
        [HttpGet("email/{email}")]
        public IActionResult GetEmployeeByEmail(string email)
        {
            return Ok(_employeesRepo.GetEmployeeByEmail(email));
        }

        [Authorize]
        [HttpGet("EmployeeExists/{firebaseId}")]
        public IActionResult EmployeeExists(string firebaseId)
        {
            Employee employee = _employeesRepo.GetEmployeeByFirebaseId(firebaseId);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [Authorize]
        [HttpPost]
        public IActionResult AddEmployee(Employee employee)
        {
            _employeesRepo.AddEmployee(employee);

            return CreatedAtAction(
                nameof(GetEmployee),
                new { firebaseId = employee.FirebaseUserId },
                employee);
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult UpdateEmployee(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }
            _employeesRepo.EditEmployee(employee);
            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            _employeesRepo.DeleteEmployee(id);
            return NoContent();
        }
    }
}
