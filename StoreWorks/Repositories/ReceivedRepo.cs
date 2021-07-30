using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using StoreWorks.Models;
using StoreWorks.Repositories.Interfaces;
using StoreWorks.Utils;
using System.Collections.Generic;

namespace StoreWorks.Repositories
{
    public class ReceivedRepo : BaseRepository, IReceivedRepo
    {
        public ReceivedRepo(IConfiguration configuration) : base(configuration) { }

        public void AddReceived(Received received)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Received
                            (ProductId, EmployeeId, ReceivedQuantity, ReceivedDate, ReceivedTotal)
                        OUTPUT INSERTED.ID
                        VALUES
                            (@productId, @employeeId, @receivedQuantity, GETDATE(), @receivedTotal)";
                    DbUtils.AddParameter(cmd, "@productId", received.ProductId);
                    DbUtils.AddParameter(cmd, "@employeeId", received.EmployeeId);
                    DbUtils.AddParameter(cmd, "@receivedQuantity", received.ReceivedQuantity);
                    DbUtils.AddParameter(cmd, "@receivedTotal", received.ReceivedTotal);

                    received.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<Received> GetAllReceived()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT
                            Id, ProductId, EmployeeId, ReceivedQuantity, ReceivedDate, ReceivedTotal
                        FROM Received";
                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Received> allReceived = new List<Received>();
                    while (reader.Read())
                    {
                        allReceived.Add(new Received()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ProductId = DbUtils.GetInt(reader, "ProductId"),
                            EmployeeId = DbUtils.GetInt(reader, "EmployeeId"),
                            ReceivedQuantity = DbUtils.GetInt(reader, "ReceivedQuantity"),
                            ReceivedDate = DbUtils.GetDateTime(reader, "ReceivedDate"),
                            ReceivedTotal = DbUtils.GetDecimal(reader, "ReceivedTotal")
                        });
                    }
                    reader.Close();
                    return allReceived;
                }
            }
        }
    }
}
