using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PHMonitor.Migrations
{
    /// <inheritdoc />
    public partial class RemoveDeviceID : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionnaireResponses_Devices_DeviceId",
                table: "QuestionnaireResponses");

            migrationBuilder.DropTable(
                name: "UserDeviceMappings");

            migrationBuilder.DropIndex(
                name: "IX_QuestionnaireResponses_DeviceId",
                table: "QuestionnaireResponses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Devices",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "DeviceId",
                table: "QuestionnaireResponses");

            migrationBuilder.DropColumn(
                name: "DeviceId",
                table: "Devices");

            migrationBuilder.AddColumn<string>(
                name: "DeviceName",
                table: "QuestionnaireResponses",
                type: "character varying(100)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "DeviceName",
                table: "Devices",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Devices",
                table: "Devices",
                column: "DeviceName");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionnaireResponses_DeviceName",
                table: "QuestionnaireResponses",
                column: "DeviceName");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionnaireResponses_Devices_DeviceName",
                table: "QuestionnaireResponses",
                column: "DeviceName",
                principalTable: "Devices",
                principalColumn: "DeviceName",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionnaireResponses_Devices_DeviceName",
                table: "QuestionnaireResponses");

            migrationBuilder.DropIndex(
                name: "IX_QuestionnaireResponses_DeviceName",
                table: "QuestionnaireResponses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Devices",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "DeviceName",
                table: "QuestionnaireResponses");

            migrationBuilder.AddColumn<int>(
                name: "DeviceId",
                table: "QuestionnaireResponses",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "DeviceName",
                table: "Devices",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AddColumn<int>(
                name: "DeviceId",
                table: "Devices",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Devices",
                table: "Devices",
                column: "DeviceId");

            migrationBuilder.CreateTable(
                name: "UserDeviceMappings",
                columns: table => new
                {
                    MappingId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DeviceId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false)
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
                name: "IX_QuestionnaireResponses_DeviceId",
                table: "QuestionnaireResponses",
                column: "DeviceId");

            migrationBuilder.CreateIndex(
                name: "IX_UserDeviceMappings_DeviceId",
                table: "UserDeviceMappings",
                column: "DeviceId");

            migrationBuilder.CreateIndex(
                name: "IX_UserDeviceMappings_UserId",
                table: "UserDeviceMappings",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionnaireResponses_Devices_DeviceId",
                table: "QuestionnaireResponses",
                column: "DeviceId",
                principalTable: "Devices",
                principalColumn: "DeviceId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
