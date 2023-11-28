using Microsoft.AspNetCore.Mvc;
using PHMonitor.SQL; // Replace with your actual namespace
using System.Threading.Tasks;
using PHMonitor.Data;

namespace PHMonitor.Controllers
{
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

            // Check if the device exists for the user
            var device = _context.Devices.FirstOrDefault(d => d.DeviceName == responseDto.DeviceName && d.UserId == responseDto.UserId);
            if (device == null)
            {
                return BadRequest("Device not found.");
            }

            var questionnaireResponse = new QuestionnaireResponse
            {
                UserId = responseDto.UserId,
                DeviceName = responseDto.DeviceName,
                FactoryDefaultParts = responseDto.FactoryDefaultParts,
                ModifiedParts = responseDto.ModifiedParts,
                IsUndervolting = responseDto.IsUndervolting
            };

            _context.QuestionnaireResponses.Add(questionnaireResponse);
            await _context.SaveChangesAsync();

            return Ok(questionnaireResponse);
        }
        [HttpDelete("user/{userId}")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User deleted successfully." });
        }

    }

}