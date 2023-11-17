using Microsoft.AspNetCore.Mvc;
using PHMonitor.SQL; // Replace with your actual namespace
using System.Linq;
using System.Threading.Tasks;
using PHMonitor.Data;
using Microsoft.EntityFrameworkCore;

namespace PHMonitor.Controllers
{
    [ApiController]
    [Route("api/device")]
    public class DeviceController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DeviceController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetDevicesByUser(int userId)
        {
            var devices = await _context.Devices.Where(d => d.UserId == userId).ToListAsync();
            return Ok(devices);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddDevice([FromBody] DeviceDto deviceDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if device name already exists for the user
            var existingDevice = await _context.Devices.FirstOrDefaultAsync(d => d.DeviceName == deviceDto.DeviceName && d.UserId == deviceDto.UserId);
            if (existingDevice != null)
            {
                return BadRequest("A device with the same name already exists.");
            }

            var newDevice = new Device
            {
                // Populate the new device data
                UserId = deviceDto.UserId,
                DeviceName = deviceDto.DeviceName,
                DeviceType = deviceDto.DeviceType,
                Motherboard = deviceDto.Motherboard,
                AverageCoreTemp = deviceDto.AverageCoreTemp,
                AverageCoreVoltage = deviceDto.AverageCoreVoltage,
                TotalLoadPercentage = deviceDto.TotalLoadPercentage,
                GpuCoreLoad = deviceDto.GpuCoreLoad,
                GpuCoreTemp = deviceDto.GpuCoreTemp,
                BusSpeed = deviceDto.BusSpeed,
                CpuPackage = deviceDto.CpuPackage
            };

            _context.Devices.Add(newDevice);
            await _context.SaveChangesAsync();

            return Ok(newDevice);
        }

        [HttpPut("update/{deviceName}")]
        public async Task<IActionResult> UpdateDevice(string deviceName, [FromBody] DeviceDto deviceDto)
        {
            var device = await _context.Devices.FirstOrDefaultAsync(d => d.DeviceName == deviceName && d.UserId == deviceDto.UserId);

            if (device == null)
            {
                return NotFound();
            }

            // Prevent changing to a name that already exists for the same user
            if (device.DeviceName != deviceDto.DeviceName && await _context.Devices.AnyAsync(d => d.DeviceName == deviceDto.DeviceName && d.UserId == deviceDto.UserId))
            {
                return BadRequest("A device with the same name already exists.");
            }

            // Update existing device data
            device.DeviceType = deviceDto.DeviceType;
            device.Motherboard = deviceDto.Motherboard;
            device.AverageCoreTemp = deviceDto.AverageCoreTemp;
            device.AverageCoreVoltage = deviceDto.AverageCoreVoltage;
            device.TotalLoadPercentage = deviceDto.TotalLoadPercentage;
            device.GpuCoreLoad = deviceDto.GpuCoreLoad;
            device.GpuCoreTemp = deviceDto.GpuCoreTemp;
            device.BusSpeed = deviceDto.BusSpeed;
            device.CpuPackage = deviceDto.CpuPackage;

            _context.Entry(device).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
