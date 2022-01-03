using System.ComponentModel.DataAnnotations;
using System.Net.Mail;
using Application.Response;
using MediatR;

namespace Application.Features.Commands
{
    public class SendEmail : IRequest<Message>
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string To { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string From { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Message { get; set; }
    }
}