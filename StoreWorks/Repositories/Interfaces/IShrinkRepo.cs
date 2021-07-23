using System.Collections.Generic;
using StoreWorks.Models;

namespace StoreWorks.Repositories.Interfaces
{
    public interface IShrinkRepo
    {
        List<Shrink> GetAllShrink();
        void AddShrink(Shrink shrink);
        //void EditShrink(Shrink shrink);
        //void DeleteShrink(int id);
    }
}
