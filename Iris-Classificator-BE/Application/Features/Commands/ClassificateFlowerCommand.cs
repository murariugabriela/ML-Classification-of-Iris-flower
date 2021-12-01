using MediatR;
using System;
using Application.Response;

namespace Application.Features.Commands
{
    public class ClassificateFlowerCommand : IRequest<Message>
    {
        public float SepalWidth { get; set; }
        public float SepalHeight { get; set; }
        public float PetalWidth { get; set; }
        public float PetalHeight { get; set; }
    }
}
