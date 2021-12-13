using System;
using System.Threading;
using Application.Features.Commands;
using Application.Response;
using MediatR;
using Xunit;
using Xunit.Abstractions;
using Assert = NUnit.Framework.Assert;

namespace IrisClassificator.Tests.Service
{
    public class ClassificateFlowerCommandHandlerTests
    {
        [Fact]
        public async void Given_Data_When_DataRepresentsFloatNumbers_Then_ClassifyFlower()
        {
            var command = new ClassificateFlowerCommand();
            command.PetalHeight = 1.4f; command.PetalWidth = 0.2f;
            command.SepalHeight = 5.1f; command.SepalWidth = 3.5f;
            var handler = new ClassificateFlowerCommandHandler();
            var result = await handler.Handle(command, new CancellationToken());
            Assert.IsTrue(result.message != "");
        }
    }
}