using StoreWorks.Models;
using System.Collections.Generic;

namespace StoreWorks.Repositories.Interfaces
{
    public interface ICategoriesRepo
    {
        List<Category> GetAllCategories();
        Category GetCategoryById(int id);
    }
}
