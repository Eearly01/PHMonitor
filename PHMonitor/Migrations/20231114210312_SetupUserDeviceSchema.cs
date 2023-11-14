using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PHMonitor.Migrations
{
    /// <inheritdoc />
    public partial class SetupUserDeviceSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HardwareInfos");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Username = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Devices",
                columns: table => new
                {
                    DeviceId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    DeviceName = table.Column<string>(type: "text", nullable: false),
                    DeviceType = table.Column<string>(type: "text", nullable: false),
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
                    table.PrimaryKey("PK_Devices", x => x.DeviceId);
                    table.ForeignKey(
                        name: "FK_Devices_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuestionnaireResponses",
                columns: table => new
                {
                    ResponseId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    DeviceId = table.Column<int>(type: "integer", nullable: false),
                    FactoryDefaultParts = table.Column<bool>(type: "boolean", nullable: false),
                    ModifiedParts = table.Column<string>(type: "text", nullable: false),
                    IsUndervolting = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionnaireResponses", x => x.ResponseId);
                    table.ForeignKey(
                        name: "FK_QuestionnaireResponses_Devices_DeviceId",
                        column: x => x.DeviceId,
                        principalTable: "Devices",
                        principalColumn: "DeviceId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuestionnaireResponses_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserDeviceMappings",
                columns: table => new
                {
                    MappingId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    DeviceId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserDeviceMappings", x => x.MappingId);
                    table.ForeignKey(
                        name: "FK_UserDeviceMappings_Devices_DeviceId",
                        column: x => x.DeviceId,
                        principalTable: "Devices",
                        principalColumn: "DeviceId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserDeviceMappings_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Devices_UserId",
                table: "Devices",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionnaireResponses_DeviceId",
                table: "QuestionnaireResponses",
                column: "DeviceId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionnaireResponses_UserId",
                table: "QuestionnaireResponses",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserDeviceMappings_DeviceId",
                table: "UserDeviceMappings",
                column: "DeviceId");

            migrationBuilder.CreateIndex(
                name: "IX_UserDeviceMappings_UserId",
                table: "UserDeviceMappings",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuestionnaireResponses");

            migrationBuilder.DropTable(
                name: "UserDeviceMappings");

            migrationBuilder.DropTable(
                name: "Devices");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.CreateTable(
                name: "HardwareInfos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AverageCoreTemp = table.Column<double>(type: "double precision", nullable: false),
                    AverageCoreVoltage = table.Column<double>(type: "double precision", nullable: false),
                    BusSpeed = table.Column<double>(type: "double precision", nullable: false),
                    CpuPackage = table.Column<double>(type: "double precision", nullable: false),
                    GpuCoreLoad = table.Column<double>(type: "double precision", nullable: false),
                    GpuCoreTemp = table.Column<double>(type: "double precision", nullable: false),
                    Motherboard = table.Column<string>(type: "text", nullable: false),
                    TotalLoadPercentage = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HardwareInfos", x => x.Id);
                });
        }
    }
}
