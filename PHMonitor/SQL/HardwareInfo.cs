using System.ComponentModel.DataAnnotations;

namespace PHMonitor.SQL
{
    public class HardwareInfo
    {
        [Key]
        public int Id { get; set; }
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
