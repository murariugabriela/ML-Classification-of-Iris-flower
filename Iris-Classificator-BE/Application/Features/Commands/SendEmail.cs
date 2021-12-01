using System.Net.Mail;
using Application.Response;
using MediatR;

namespace Application.Features.Commands
{
    public class SendEmail : IRequest<Message>
    {
        public string To { get; set; }
        public string From { get; set; }
        public string Name { get; set; }
        public string Message { get; set; }
    }
}