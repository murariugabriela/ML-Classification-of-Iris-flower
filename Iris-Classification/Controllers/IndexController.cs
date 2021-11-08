/// <summary>
/// Summary description for Class1
/// </summary>
namespace Iris_Classification.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class IndexController : ControllerBase
	{
        private readonly ILogger<Index> _logger;

        public IndexController(ILogger<Index> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public string Get()
        {
            return "hello";
        }
    }
}
