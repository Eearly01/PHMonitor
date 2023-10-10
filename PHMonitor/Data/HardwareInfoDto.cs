using System.Collections.Generic;

namespace PHMonitor.Data.DTOs
{
    public class HardwareInfoDto
    {
        public string Name { get; set; }
        public string HType { get; set; }
        public List<SensorInfoDto> Sensors { get; set; }
    }

    public class SensorInfoDto
    {
        public string Name { get; set; }
        public string SensorType { get; set; }
        public float? Value { get; set; }
    }
}
