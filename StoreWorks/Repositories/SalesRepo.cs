using StoreWorks.Repositories.Interfaces;
using StoreWorks.Models;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using StoreWorks.Utils;

namespace StoreWorks.Repositories
{
    public class SalesRepo : BaseRepository, ISalesRepo
    {
        public SalesRepo(IConfiguration configuration) : base(configuration) { }

        public void AddSale(Sale sale)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Sales (
                            ProductId, EmployeeId, SaleQuantity,
                            SaleDate, SaleTotal )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @productId, @employeeId, @saleQuantity,
                            GETDATE(), @saleTotal )";
                    DbUtils.AddParameter(cmd, "@productId", sale.ProductId);
                    DbUtils.AddParameter(cmd, "@employeeId", sale.EmployeeId);
                    DbUtils.AddParameter(cmd, "@saleQuantity", sale.SaleQuantity);
                    DbUtils.AddParameter(cmd, "@saleTotal", sale.SaleTotal);

                    sale.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<Sale> GetAllSales()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, ProductId, EmployeeId,
                          SaleQuantity, SaleDate, SaleTotal
                        FROM Sales";
                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Sale> sales = new List<Sale>();
                    while (reader.Read())
                    {
                        sales.Add(new Sale()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ProductId = DbUtils.GetInt(reader, "ProductId"),
                            EmployeeId = DbUtils.GetInt(reader, "EmployeeId"),
                            SaleQuantity = DbUtils.GetInt(reader, "SaleQuantity"),
                            SaleDate = DbUtils.GetDateTime(reader, "SaleDate"),
                            SaleTotal = DbUtils.GetDecimal(reader, "SaleTotal")
                        });
                    }
                    reader.Close();
                    return sales;
                }
            }
        }
    }
}
