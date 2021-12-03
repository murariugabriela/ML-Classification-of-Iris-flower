using System.Net;
using System.Net.Mail;
using Application.Features.Commands;
using Application.Response;
using MediatR;
using WebAPI.Controllers.v1;
using FakeItEasy;
using Xunit;
using Moq;

namespace IrisClassificator.Tests.API.v1
{
    public class ContactControllerTests
    {
        private readonly ContactController controller;
        private readonly IMediator mediator;
        
        public ContactControllerTests()
        {
            mediator = A.Fake<IMediator>();
            controller = new ContactController(mediator);
        }
        [Fact]
        public async void Given_ContactController_When_SendIsCalled_Then_ShouldReturnA_Message()
        {
            await controller.Send(A<SendEmail>._);
            A.CallTo(() => mediator.Send(A<IRequest<Message>>._, default)).MustHaveHappenedOnceExactly();
        }
    }
}