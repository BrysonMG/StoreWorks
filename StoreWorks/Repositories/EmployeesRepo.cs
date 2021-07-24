﻿using Microsoft.Data.SqlClient;
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
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT
                            Id, FirebaseUserId, EmployeeName, Email, CanManage
                        FROM Employees";
                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Employee> employees = new List<Employee>();

                    while (reader.Read())
                    {
                        employees.Add(new Employee()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            EmployeeName = DbUtils.GetString(reader, "EmployeeName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CanManage = DbUtils.IsNotDbNull(reader, "CanManage")
                        });
                    }
                    reader.Close();
                    return employees;
                }
            }
        }

        public Employee GetEmployeeById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, FirebaseUserId, EmployeeName, Email, CanManage
                        FROM Employees
                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    Employee employee = null;

                    if (reader.Read())
                    {
                        employee = new Employee()
                        {
                            Id = id,
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            EmployeeName = DbUtils.GetString(reader, "EmployeeName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CanManage = DbUtils.IsNotDbNull(reader, "CanManage")
                        }
                    }
                    reader.Close();
                    return employee;
                }
            }
        }

        public void AddEmployee(Employee employee)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Employees
                            (FirebaseUserId, EmployeeName, Email, CanManage)
                        OUTPUT INSERTED.ID
                        VALUES
                            (@firebaseUserId, @employeeName, @email, @canManage)";
                    DbUtils.AddParameter(cmd, "@firebaseUserId", employee.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@employeeName", employee.EmployeeName);
                    DbUtils.AddParameter(cmd, "@email", employee.Email);
                    DbUtils.AddParameter(cmd, "@canManage", employee.CanManage);

                    employee.Id = (int)cmd.ExecuteScalar();
                }
            }
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
