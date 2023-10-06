using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenHardwareMonitor.Hardware;

namespace YourNamespace.Controllers
{
    [Authorize]
    [Route("api/openhardware")]
    [ApiController]
    public class CpuTemperatureController : ControllerBase
    {
        [HttpGet]
        public ActionResult GetCpuTemperature()
        {
            Computer c = new Computer
            {
                GPUEnabled = true,
                CPUEnabled = true,
            };

            c.Open();

            float cpuTemp = 0;

            foreach (var hardware in c.Hardware)
            {
                if (hardware.HardwareType == HardwareType.CPU)
                {
                    hardware.Update();

                    foreach (var sensor in hardware.Sensors)
                    {
                        if (sensor.SensorType == SensorType.Temperature && sensor.Name.Contains("CPU Package"))
                        {
                            cpuTemp = sensor.Value.GetValueOrDefault();
                            break;
                        }
                    }
                }
            }

            return Ok(new { temperature = cpuTemp });
        }
    }
}
