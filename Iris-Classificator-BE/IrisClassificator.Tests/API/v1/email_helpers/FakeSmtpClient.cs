using System.Net.Mail;

namespace IrisClassificator.Tests.API.v1.email_helpers
{
    public class FakeSmtpClient : ISmtpClient
    {
        public bool MailSent { get; set; }

        public FakeSmtpClient()
        {
            MailSent = false;
        }

        public void Send(MailMessage message)
        {
            MailSent = true;
        }
    }
}