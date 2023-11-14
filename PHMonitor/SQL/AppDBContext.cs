using Microsoft.EntityFrameworkCore;
using System;

namespace PHMonitor.SQL
{

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Device> Devices { get; set; }
        public DbSet<UserDeviceMapping> UserDeviceMappings { get; set; }
        public DbSet<QuestionnaireResponse> QuestionnaireResponses { get; set; }
    }
}
