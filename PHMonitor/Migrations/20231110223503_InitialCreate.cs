using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PHMonitor.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HardwareInfos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Motherboard = table.Column<string>(type: "text", nullable: false),
                    AverageCoreTemp = table.Column<double>(type: "double precision", nullable: false),
                    AverageCoreVoltage = table.Column<double>(type: "double precision", nullable: false),
                    TotalLoadPercentage = table.Column<double>(type: "double precision", nullable: false),
                    GpuCoreLoad = table.Column<double>(type: "double precision", nullable: false),
                    GpuCoreTemp = table.Column<double>(type: "double precision", nullable: false),
                    BusSpeed = table.Column<double>(type: "double precision", nullable: false),
                    CpuPackage = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HardwareInfos", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HardwareInfos");
        }
    }
}
