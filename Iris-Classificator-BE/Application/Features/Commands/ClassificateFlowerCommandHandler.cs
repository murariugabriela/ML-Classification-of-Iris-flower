using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Application.Response;

namespace Application.Features.Commands
{
    public class ClassificateFlowerCommandHandler : IRequestHandler<ClassificateFlowerCommand, Message>
    {
        public async Task<Message> Handle(ClassificateFlowerCommand request, CancellationToken cancellationToken)
        {
            return new Message("flower type");
        }
    }
}
