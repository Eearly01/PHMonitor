using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PHMonitor.SQL
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        // Add other user properties as needed
    }

    public class Device
    {
        [Key]
        [Required]
        [MaxLength(100)] // Adjust the length as needed
        public string DeviceName { get; set; }
        public int UserId { get; set; }  // Foreign key to User
        public string DeviceType { get; set; }
        public string Motherboard { get; set; }
        public double AverageCoreTemp { get; set; }
        public double AverageCoreVoltage { get; set; }
        public double TotalLoadPercentage { get; set; }
        public double GpuCoreLoad { get; set; }
        public double GpuCoreTemp { get; set; }
        public double BusSpeed { get; set; }
        public double CpuPackage { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }
    }

public class QuestionnaireResponse
{
    [Key]
    public int ResponseId { get; set; }
    public int UserId { get; set; }
    public string DeviceName { get; set; }
    public bool FactoryDefaultParts { get; set; }
    public string ModifiedParts { get; set; } // JSON or delimited text
    public bool IsUndervolting { get; set; }

    [ForeignKey("UserId")]
    public User User { get; set; }

    [ForeignKey("DeviceName")]
    public Device Device
    {
        get; set;
    }
}

}
