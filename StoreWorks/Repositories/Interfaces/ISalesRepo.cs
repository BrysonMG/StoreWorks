using StoreWorks.Models;
using System.Collections.Generic;

namespace StoreWorks.Repositories.Interfaces
{
    public interface ISalesRepo
    {
        List<Sale> GetAllSales();
        void AddSale(Sale sale);
        //void EditSale(Sale sale);
        //void DeleteSale(int id);
    }
}
