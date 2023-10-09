using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using LibreHardwareMonitor.Hardware;

namespace PHMonitor.Controllers
{
    [Authorize]
    [Route("api/hardware")]
    [ApiController]
    public class CpuTemperatureController : ControllerBase
    {
        [HttpGet]
        public ActionResult GetCpuTemperature()
        {
            Computer c = new Computer
            {
                IsGpuEnabled = true,
                IsCpuEnabled = true,
            };

            c.Open();

            float cpuTemp = 0;

            foreach (var hardware in c.Hardware)
            {
                if (hardware.HardwareType == HardwareType.Cpu)
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
