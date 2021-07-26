using StoreWorks.Repositories.Interfaces;
using StoreWorks.Models;
using StoreWorks.Utils;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;

namespace StoreWorks.Repositories
{
    public class ProductsRepo : BaseRepository, IProductsRepo
    {
        public ProductsRepo(IConfiguration configuration) : base(configuration) { }

        public void AddProduct(Product product)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Products
                        (CategoryId, ProductName, Quantity, Cost, SellPrice)
                        OUTPUT INSERTED.ID
                        VALUES
                        (@categoryId, @productName, @quantity, @cost, @sellPrice)";
                    DbUtils.AddParameter(cmd, "@categoryId", product.CategoryId);
                    DbUtils.AddParameter(cmd, "@productName", product.ProductName);
                    DbUtils.AddParameter(cmd, "@quantity", product.Quantity);
                    DbUtils.AddParameter(cmd, "@cost", product.Cost);
                    DbUtils.AddParameter(cmd, "@sellPrice", product.SellPrice);

                    product.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void DeleteProduct(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                { //Before deleting the product, change all of its sales, received,
                  //and shrinkage to "Deleted Product". In the future, change this
                  //to implement active & deactivated Products to retain their information
                    cmd.CommandText = @"
                        UPDATE Sales
                            SET ProductId = 1
                            WHERE ProductId = @id
                        UPDATE Received
                            SET ProductId = 1
                            WHERE ProductId = @id
                        UPDATE Shrinkage
                            SET ProductId = 1
                            WHERE ProductId = @id
                        DELETE FROM Products
                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void EditProduct(Product product)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Products
                        SET
                            CategoryId = @categoryId,
                            ProductName = @productName,
                            Quantity = @quantity,
                            Cost = @cost,
                            SellPrice = @sellPrice
                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@categoryId", product.CategoryId);
                    DbUtils.AddParameter(cmd, "@productName", product.ProductName);
                    DbUtils.AddParameter(cmd, "@quantity", product.Quantity);
                    DbUtils.AddParameter(cmd, "@cost", product.Cost);
                    DbUtils.AddParameter(cmd, "@sellPrice", product.SellPrice);
                    DbUtils.AddParameter(cmd, "@id", product.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Product> GetAllProducts()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, CategoryId, ProductName, Quantity, Cost, SellPrice
                        FROM Products";
                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Product> products = new List<Product>();
                    while (reader.Read())
                    {
                        products.Add(new Product()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            ProductName = DbUtils.GetString(reader, "ProductName"),
                            Quantity = DbUtils.GetInt(reader, "Quantity"),
                            Cost = DbUtils.GetDecimal(reader, "Cost"),
                            SellPrice = DbUtils.GetDecimal(reader, "SellPrice")
                        });
                    }
                    reader.Close();
                    return products;
                }
            }
        }

        public Product GetProductById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, CategoryId, ProductName, Quantity, Cost, SellPrice
                        FROM Products
                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    SqlDataReader reader = cmd.ExecuteReader();

                    Product product = null;

                    if (reader.Read())
                    {
                        product = new Product()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            ProductName = DbUtils.GetString(reader, "ProductName"),
                            Quantity = DbUtils.GetInt(reader, "Quantity"),
                            Cost = DbUtils.GetDecimal(reader, "Cost"),
                            SellPrice = DbUtils.GetDecimal(reader, "SellPrice")
                        };
                    }
                    reader.Close();
                    return product;
                }
            }
        }
