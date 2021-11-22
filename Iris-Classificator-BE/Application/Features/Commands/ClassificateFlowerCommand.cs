using MediatR;
using System;

namespace Application.Features.Commands
{
    public class ClassificateFlowerCommand : IRequest<string>
    {
        public float SepalWidth { get; set; }
        public float SepalHeight { get; set; }
        public float PetalWidth { get; set; }
        public float PetalHeight { get; set; }
    }
}
