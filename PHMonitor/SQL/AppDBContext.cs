using Microsoft.EntityFrameworkCore;
using System;

namespace PHMonitor.SQL
{

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<HardwareInfo> HardwareInfos { get; set; }
    }
}
