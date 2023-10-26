using System.Collections.Generic;

namespace PHMonitor.Data.DTOs
{
    public class HardwareInfoDto
    {
        public string Name { get; set; } = string.Empty;
        public string HType { get; set; } = string.Empty;
        public List<SensorInfoDto> Sensors { get; set; }
    }

    public class SensorInfoDto
    {
        public string Name { get; set; } = string.Empty; 
        public string SensorType { get; set; } = String.Empty;
        public float? Value { get; set; }
    }
}
