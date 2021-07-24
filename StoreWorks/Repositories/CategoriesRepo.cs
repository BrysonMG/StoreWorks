using StoreWorks.Repositories.Interfaces;
using StoreWorks.Models;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using StoreWorks.Utils;

namespace StoreWorks.Repositories
{
    public class CategoriesRepo : BaseRepository, ICategoriesRepo
    {
        public CategoriesRepo(IConfiguration configuration) : base(configuration) { }

        public List<Category> GetAllCategories()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, CategoryName
                        FROM Categories";
                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Category> categories = new List<Category>();
                    while (reader.Read())
                    {
                        categories.Add(new Category()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            CategoryName = DbUtils.GetString(reader, "CategoryName")
                        });
                    }
                    reader.Close();
                    return categories;
                }
            }
        }

        public Category GetCategoryById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, CategoryName
                        FROM Categories
                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    SqlDataReader reader = cmd.ExecuteReader();

                    Category category = null;

                    if (reader.Read())
                    {
                        category = new Category()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            CategoryName = DbUtils.GetString(reader, "CategoryName")
                        };
                    }
                    reader.Close();
                    return category;
                }
            }
        }
    }
}
