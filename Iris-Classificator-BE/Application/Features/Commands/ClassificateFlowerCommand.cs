using MediatR;
using System.ComponentModel.DataAnnotations;
using Application.Response;

namespace Application.Features.Commands
{
    public class ClassificateFlowerCommand : IRequest<Message>
    {   
        [Required]
        [Range(0.0, 8.0)]
        public float SepalWidth { get; set; }
        [Required]
        [Range(0.0, 8.0)]
        public float SepalHeight { get; set; }
        [Required]
        [Range(0.0, 8.0)]
        public float PetalWidth { get; set; }
        [Required]
        [Range(0.0, 8.0)]
        public float PetalHeight { get; set; }
    }
}
