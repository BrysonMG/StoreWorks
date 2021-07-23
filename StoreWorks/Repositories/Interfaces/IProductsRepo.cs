using StoreWorks.Models;
using System.Collections.Generic;

namespace StoreWorks.Repositories.Interfaces
{
    public interface IProductsRepo
    {
        List<Product> GetAllProducts();
        Product GetProductById(int id);
        void AddProduct(Product product);
        void EditProduct(Product product);
        void DeleteProduct(int id);

    }
}
