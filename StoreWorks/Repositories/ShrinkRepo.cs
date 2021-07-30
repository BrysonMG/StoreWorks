using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using StoreWorks.Models;
using StoreWorks.Repositories.Interfaces;
using StoreWorks.Utils;
using System.Collections.Generic;

namespace StoreWorks.Repositories
{
    public class ShrinkRepo : BaseRepository, IShrinkRepo
    {
        public ShrinkRepo(IConfiguration configuration) : base(configuration) { }

        public void AddShrink(Shrink shrink)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Shrinkage (
                            ProductId, EmployeeId, ShrinkQuantity, ShrinkDate, ShrinkTotal)
                        OUTPUT INSERTED.ID
                        VALUES (
                            @productId, @employeeId, @shrinkQuantity, GETDATE(), @shrinkTotal)";
                    DbUtils.AddParameter(cmd, "@productId", shrink.ProductId);
                    DbUtils.AddParameter(cmd, "@employeeId", shrink.EmployeeId);
                    DbUtils.AddParameter(cmd, "@shrinkQuantity", shrink.ShrinkQuantity);
                    DbUtils.AddParameter(cmd, "@shrinkTotal", shrink.ShrinkTotal);

                    shrink.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<Shrink> GetAllShrink()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, ProductId, EmployeeId
                          ShrinkQuantity, ShrinkDate, ShrinkTotal
                        FROM Shrinkage";
                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Shrink> shrinkage = new List<Shrink>();
                    while (reader.Read())
                    {
                        shrinkage.Add(new Shrink()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ProductId = DbUtils.GetInt(reader, "ProductId"),
                            EmployeeId = DbUtils.GetInt(reader, "EmployeeId"),
                            ShrinkQuantity = DbUtils.GetInt(reader, "ShrinkQuantity"),
                            ShrinkDate = DbUtils.GetDateTime(reader, "ShrinkDate"),
                            ShrinkTotal = DbUtils.GetDecimal(reader, "ShrinkTotal")
                        });
                    }
                    reader.Close();
                    return shrinkage;
                }
            }
        }
    }
}
