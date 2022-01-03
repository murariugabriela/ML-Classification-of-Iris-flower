using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Validation
{
    public interface IValidator<in T> 
    {
        // ValueTask<Result<bool>> ValidateAsync(T data, CancellationToken ct);
    }
}