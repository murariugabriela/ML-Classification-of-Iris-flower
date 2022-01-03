using System;
using System.Threading.Tasks;
using Application.Features.Commands;
using Application.Response;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.v1
{
    [ApiController]
    [ApiVersion("1.0")]
    public class IrisClassificationController : BaseController
    {
        public IrisClassificationController(IMediator mediator) : base(mediator)
        {
        }

        [HttpPost]
        public async Task<IActionResult> Classify([FromBody] ClassificateFlowerCommand command)
        {
            return Ok(await mediator.Send(command));
            // return BadRequest(new Message("Bad request schimba"));
        }

        [Route("Image")]
        [HttpPost]
        public async Task<IActionResult> ClassifyImage([FromForm] ClassifyImageCommand command)
        {
            return Ok(await mediator.Send(command));
        }
    }
}