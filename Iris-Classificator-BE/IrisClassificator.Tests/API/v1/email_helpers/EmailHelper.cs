using System;
using System.Net.Mail;
using System.Text.RegularExpressions;

namespace IrisClassificator.Tests.API.v1.email_helpers
{
    public class EmailHelper
    {
        private ISmtpClient smtpClient;

        public EmailHelper(ISmtpClient smtpClient)
        {
            this.smtpClient = smtpClient;
        }

        public void SendSupportMail(string toAddress)
        {
            if (IsValid(toAddress))
            {
                MailMessage message = MakeMessage(toAddress);
                smtpClient.Send(message);
            }
        }

        public MailMessage MakeMessage(string toAddress)
        {
            MailMessage message = new MailMessage("support@bigcorp.com", toAddress);
            message.IsBodyHtml = false;
            message.Subject = "BigCorp Support wants to help";
            message.Body = string.Format("BigCorp is dealing with your problem./nYour reference for this issue is {0}.",
                new Random().Next(0, 10000));
            return message;
        }

        public bool IsValid(string emailAddress)
        {
            return Regex.IsMatch(emailAddress,
                @"^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$");
        }
    }
}