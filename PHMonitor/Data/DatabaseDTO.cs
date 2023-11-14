namespace PHMonitor.Data {
    public class QuestionnaireResponseDto
    {
        public int UserId { get; set; }
        public int DeviceId { get; set; }
        public bool FactoryDefaultParts { get; set; }
        public string ModifiedParts { get; set; }
        public bool IsUndervolting { get; set; }
    }

    public class DeviceDto
    {
        public int UserId { get; set; }
        public int DeviceId { get; set; }
        public string DeviceName { get; set; }
        public string DeviceType { get; set; }
        // Add other fields as necessary
    }

}