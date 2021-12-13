using System.IO;
using Application.Features.Commands;
using FakeItEasy;
using MediatR;
using Microsoft.AspNetCore.Http;
using Moq;
using WebAPI.Controllers.v1;
using Xunit;
using Assert = NUnit.Framework.Assert;

namespace IrisClassificator.Tests.API.v1
{
    public class IrisClassificationControllerTests
    {
        private readonly IrisClassificationController _controller;
        private readonly IMediator _mediator;

        public IrisClassificationControllerTests()
        {
            _mediator = A.Fake<IMediator>();
            _controller = new IrisClassificationController(_mediator);
        }
        
        [Fact]
        public void Given_Data_When_DataRepresentsFloatNumbers_Then_ClassifyFlower()
        {
            var command = new ClassificateFlowerCommand();
            command.PetalHeight = 1.4f;
            command.PetalWidth = 0.2f;
            command.SepalHeight = 5.1f;
            command.SepalWidth = 3.5f;
            Assert.IsTrue(_mediator.Send(command).IsCompleted);
        }
        
        [Fact]
        public void Given_Data_When_DataRepresentsImage_Then_ClassifyFlower()
        {
            var fileMock = new Mock<IFormFile>();
            //Setup mock file using a memory stream
            var content = "Fake File";
            var fileName = "Iris-versicolor-1.jpg";
            var ms = new MemoryStream();
            var writer = new StreamWriter(ms);
            writer.Write(content);
            writer.Flush();
            ms.Position = 0;
            fileMock.Setup(_ => _.OpenReadStream()).Returns(ms);
            fileMock.Setup(_ => _.FileName).Returns(fileName);
            fileMock.Setup(_ => _.Length).Returns(ms.Length);

            var file = fileMock.Object;
            var command = new ClassifyImageCommand();
            command.ImagePath = file;
            command.Label = "Image";
            Assert.IsTrue(_mediator.Send(command).IsCompleted);
        }
    }
}