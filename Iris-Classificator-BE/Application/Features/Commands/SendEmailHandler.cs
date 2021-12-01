using System.Threading;
using System.Threading.Tasks;
using Application.Response;
using MediatR;

namespace Application.Features.Commands
{
    public class SendEmailHandler :  IRequestHandler<SendEmail, Message>
    {
        public async Task<Message> Handle(SendEmail request, CancellationToken cancellationToken)
        {
            return new Message("sent");
        }
    }
}