namespace PHMonitor
{
    public class HardwareMonitorData
    {
        public string? ComponentName { get; set; } // Example: CPU, GPU, etc.
        public string? SensorName { get; set; } // Example: Temperature, Fan Speed, etc.
        public float Value { get; set; } // The value of the sensor data, e.g., temperature in Celsius or fan speed in RPM.
    }
}
