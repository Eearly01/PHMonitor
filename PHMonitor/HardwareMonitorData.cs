namespace PHMonitor
{
    public class HardwareMonitorData
    {
        public string? ComponentName { get; set; } // CPU, GPU, etc.
        public string? SensorName { get; set; } // Temperature, Fan Speed, etc.
        public float Value { get; set; } // Value of sensor data, e.g., temp(C) or fan speed (RPM).
    }
}
