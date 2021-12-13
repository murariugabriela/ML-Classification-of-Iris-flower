using System.Net.Mail;

namespace IrisClassificator.Tests.API.v1.email_helpers
{
    public interface ISmtpClient
    {
        void Send(MailMessage message);
    }
}