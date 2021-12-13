using System;
using System.IO;
using System.Threading;
using Application.Features.Commands;
using Microsoft.AspNetCore.Http;
using Moq;
using Xunit;
using Xunit.Abstractions;
using Assert = NUnit.Framework.Assert;

namespace IrisClassificator.Tests.Service
{
    public class ClassifyImageCommandHandlerTests
    {
        [Fact]
        public void Given_Data_When_DataRepresentsImage_Then_ClassifyFlower()
        {
            var fileMock = new Mock<IFormFile>();
            //Setup mock file using a memory stream
            var sourceImg = File.OpenRead(Path.Combine(Environment.CurrentDirectory, "Data", "iris-images", "8050.jpg"));
            var fileName = "8050.jpg";
            var ms = new MemoryStream();
            var writer = new StreamWriter(ms);
            writer.Write(sourceImg);
            writer.Flush();
            ms.Position = 0;
            fileMock.Setup(f => f.FileName).Returns(fileName).Verifiable();
            fileMock.Setup(_ => _.CopyToAsync(It.IsAny<Stream>(), It.IsAny<CancellationToken>()))
                .Returns((Stream stream, CancellationToken token) => ms.CopyToAsync(stream)).Verifiable();
            var file = fileMock.Object;
            var command = new ClassifyImageCommand();
            var handler = new ClassifyImageCommandHandler();
            command.ImagePath = file;
            command.Label = "Image";
            Assert.IsTrue(handler.Handle(command, new CancellationToken()).IsCompleted);
        }
    }
}