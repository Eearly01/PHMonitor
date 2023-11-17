namespace PHMonitor.Data {
    public class QuestionnaireResponseDto
    {
        public int UserId { get; set; }
        public string DeviceName { get; set; }
        public bool FactoryDefaultParts { get; set; }
        public string ModifiedParts { get; set; }
        public bool IsUndervolting { get; set; }
    }

    public class DeviceDto
    {
        public int UserId { get; set; }
        public string DeviceName { get; set; }
        public string DeviceType { get; set; }
        public string Motherboard { get; set; }
        public double AverageCoreTemp { get; set; }
        public double AverageCoreVoltage { get; set; }
        public double TotalLoadPercentage { get; set; }
        public double GpuCoreLoad { get; set; }
        public double GpuCoreTemp { get; set; }
        public double BusSpeed { get; set; }
        public double CpuPackage { get; set; }
    }

}