using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using LibreHardwareMonitor.Hardware;
using PHMonitor.Data.DTOs;


namespace PHMonitor.Controllers
{
    // [Authorize]
    [ApiController]
    [Route("api/hardware")]
    public class HardwareInfoController : ControllerBase
    {
        private readonly ILogger<HardwareInfoController> _logger;

        public HardwareInfoController(ILogger<HardwareInfoController> logger)
        {
            _logger = logger;
        }
        public class UpdateVisitor : IVisitor
        {
            public void VisitComputer(IComputer computer)
            {
                computer.Traverse(this);
            }
            public void VisitHardware(IHardware hardware)
            {
                hardware.Update();
                foreach (IHardware subHardware in hardware.SubHardware) subHardware.Accept(this);
            }
            public void VisitSensor(ISensor sensor) { }
            public void VisitParameter(IParameter parameter) { }
        }

        [HttpGet]
        public ActionResult GetHardwareInfo()
        {
            try
            {
                Computer c = new Computer
                {
                    IsGpuEnabled = true,
                    IsCpuEnabled = true,
                    IsMemoryEnabled = true,
                    IsMotherboardEnabled = true,
                    IsControllerEnabled = true,
                    IsStorageEnabled = true,
                };

                c.Open();
                c.Accept(new UpdateVisitor());

                var hardwareInfoDtos = c.Hardware.Select(h => new HardwareInfoDto
                {
                    Name = h.Name,
                    HType = h.HardwareType.ToString(),
                    Sensors = h.Sensors.Select(s => new SensorInfoDto
                    {
                        Name = s.Name,
                        Value = s.Value,
                        SensorType = s.SensorType.ToString(),

                    }).ToList(),
                }).ToList();

                c.Close();

                return Ok(new { hardware = hardwareInfoDtos });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving hardware information");
                return StatusCode(500, "An error occurred while retrieving hardware information.");
            }
        }
    }
}