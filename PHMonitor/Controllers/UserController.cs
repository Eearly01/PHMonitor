using Microsoft.AspNetCore.Mvc;
using PHMonitor.SQL; // Replace with your actual namespace
using System.Threading.Tasks;
using PHMonitor.Data;

namespace PHMonitor.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("questionnaire")]
        public async Task<IActionResult> SubmitQuestionnaire([FromBody] QuestionnaireResponseDto responseDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var questionnaireResponse = new QuestionnaireResponse
            {
                UserId = responseDto.UserId,
                DeviceId = responseDto.DeviceId,
                FactoryDefaultParts = responseDto.FactoryDefaultParts,
                ModifiedParts = responseDto.ModifiedParts,
                IsUndervolting = responseDto.IsUndervolting
            };

            _context.QuestionnaireResponses.Add(questionnaireResponse);
            await _context.SaveChangesAsync();

            return Ok(questionnaireResponse);
        }
    }

}