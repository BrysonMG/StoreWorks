using StoreWorks.Models;
using System.Collections.Generic;

namespace StoreWorks.Repositories.Interfaces
{
    public interface IEmployeesRepo
    {
        List<Employee> GetAllEmployees();
        Employee GetEmployeeByFirebaseId(string firebaseId);
        Employee GetEmployeeByEmail(string email);
        void AddEmployee(Employee employee);
        void EditEmployee(Employee employee);
        void DeleteEmployee(int id);
    }
}
