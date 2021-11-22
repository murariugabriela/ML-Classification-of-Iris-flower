using System.Threading.Tasks;
using Application.Features.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.v1
{
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
        }
    }
}
