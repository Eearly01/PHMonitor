using Microsoft.AspNetCore.Mvc;
using PHMonitor.SQL; // Replace with your actual namespace
using System.Linq;
using System.Threading.Tasks;
using PHMonitor.Data;

namespace PHMonitor.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class DeviceController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DeviceController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddOrUpdateDevice([FromBody] DeviceDto deviceDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingDevice = _context.Devices.FirstOrDefault(d => d.DeviceId == deviceDto.DeviceId && d.UserId == deviceDto.UserId);

            if (existingDevice != null)
            {
                // Update existing device
                existingDevice.DeviceName = deviceDto.DeviceName;
                existingDevice.DeviceType = deviceDto.DeviceType;
                // Update other fields as necessary
            }
            else
            {
                // Add new device
                var newDevice = new Device
                {
                    UserId = deviceDto.UserId,
                    DeviceName = deviceDto.DeviceName,
                    DeviceType = deviceDto.DeviceType
                    // Set other fields as necessary
                };

                _context.Devices.Add(newDevice);
            }

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}