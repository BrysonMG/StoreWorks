using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using StoreWorks.Models;
using StoreWorks.Repositories.Interfaces;
using StoreWorks.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreWorks.Repositories
{
    public class EmployeesRepo : BaseRepository, IEmployeesRepo
    {
        public EmployeesRepo(IConfiguration configuration) : base(configuration) { }

        public List<Employee> GetAllEmployees()
        {
            throw new NotImplementedException();
        }

        public Employee GetEmployeeById(int id)
        {
            throw new NotImplementedException();
        }

        public void AddEmployee(Employee employee)
        {
            throw new NotImplementedException();
        }

        public void EditEmployee(Employee employee)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Employees
                        SET
                            EmployeeName = @employeeName,
                            CanManage = @canManage
                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@employeeName", employee.EmployeeName);
                    DbUtils.AddParameter(cmd, "@canManage", employee.CanManage);
                    DbUtils.AddParameter(cmd, "@id", employee.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteEmployee(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                { //Before deleting the employee, change all of their sales, received,
                  //and shrinkage to "Former Employee". In the future, change this
                  //to implement active & deactivated Employees to retain their information
                    cmd.CommandText = @"
                        UPDATE Sales
                            SET EmployeeId = 123456789
                            WHERE EmployeeId = @id
                        UPDATE Received
                            SET EmployeeId = 123456789
                            WHERE EmployeeId = @id
                        UPDATE Shrinkage
                            SET EmployeeId = 123456789
                            WHERE EmployeeId = @id
                        DELETE FROM Employees
                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
