using StoreWorks.Models;
using System.Collections.Generic;

namespace StoreWorks.Repositories.Interfaces
{
    public interface IReceivedRepo
    {
        List<Received> GetAllReceived();
        void AddReceived(Received received);
        //void EditReceived(Received received);
        //void DeleteReceived(int id);
    }
}
