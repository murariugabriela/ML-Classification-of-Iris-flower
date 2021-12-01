using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Application.Features.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using MimeKit;

namespace WebAPI.Controllers.v1
{
    [ApiVersion("1.0")]
    public class ContactController : BaseController
    {
        public ContactController(IMediator mediator) : base(mediator)
        {
        }

        [HttpPost]
        public async Task<IActionResult> Send([FromBody] SendEmail email)
        {
            using (MailMessage mail = new MailMessage())
            {
                mail.From = new MailAddress("iclassificator@gmail.com");
                mail.To.Add(email.To);
                mail.Subject = "["+ email.Name + "] Iris Classificator request";
                mail.Body = email.Message + "\nContact : " + email.From;

                using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                {
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = new NetworkCredential("iclassificator@gmail.com", "irisclassificator");
                    smtp.EnableSsl = true;
                    smtp.Send(mail);
                }
            }
            return Ok(await mediator.Send(email));
        }
    }
}