using Application.Response;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Features.Commands
{
    public class ClassifyImageCommand : IRequest<Message>
    {
        public IFormFile ImagePath { get; set; }
        public string Label { get; set; }
    }
}