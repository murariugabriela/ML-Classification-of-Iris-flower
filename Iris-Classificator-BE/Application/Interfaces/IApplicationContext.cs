using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IApplicationContext
    {
        //DbSet<>
       Task<int> SaveChangesAsync();

    }
}
