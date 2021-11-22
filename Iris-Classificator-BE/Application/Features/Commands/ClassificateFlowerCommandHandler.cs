using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Commands
{
    public class ClassificateFlowerCommandHandler : IRequestHandler<ClassificateFlowerCommand, string>
    {
        public async Task<string> Handle(ClassificateFlowerCommand request, CancellationToken cancellationToken)
        {
            return "flower name";
        }
    }
}
