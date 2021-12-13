using MediatR;
using WebAPI.Controllers.v1;
using FakeItEasy;
using IrisClassificator.Tests.API.v1.email_helpers;
using Xunit;
using Assert = NUnit.Framework.Assert;

namespace IrisClassificator.Tests.API.v1
{
    //[TestFixture]
    public class ContactControllerTests
    {
        private readonly ContactController _controller;
        private readonly IMediator _mediator;

        public ContactControllerTests()
        {
            _mediator = A.Fake<IMediator>();
            _controller = new ContactController(_mediator);
        }
        //[Test]
        [Fact]
        public void Given_EmailAddress_When_AddressIsValid_Then_EmailShouldBeSent()
        {
            var fakeClient = new FakeSmtpClient();
            var helper = new EmailHelper(fakeClient);

            helper.SendSupportMail("gabriela.murariu@info.uaic.ro");

            Assert.IsTrue(fakeClient.MailSent);
        }
        //[Test]
        [Fact]
        public void Given_EmailAddress_When_AddressIsInvalid_Then_EmailShouldNotBeSent()
        {
            var fakeClient = new FakeSmtpClient();
            var helper = new EmailHelper(fakeClient);

            helper.SendSupportMail("gabriela.murariuatinfo.uaic.ro");

            Assert.IsFalse(fakeClient.MailSent);
        }
    }
}