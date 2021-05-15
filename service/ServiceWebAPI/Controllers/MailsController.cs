using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web;
using System.Threading.Tasks;

namespace ServiceWebAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class MailsController : ControllerBase
    {

        private readonly ITokenAcquisition _tokenAcquisition;

        public MailsController(ITokenAcquisition tokenAcquisition)
        {
            _tokenAcquisition = tokenAcquisition;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var token = await _tokenAcquisition.GetAccessTokenForUserAsync(new[] { "User.Read" });

            return Ok(new
            {
                Data = "hello"
            });
        }
    }
}
