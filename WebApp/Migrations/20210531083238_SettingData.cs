using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp.Migrations
{
    public partial class SettingData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "imageData",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "TEXT", nullable: false),
                    image = table.Column<string>(type: "TEXT", nullable: true),
                    image_format = table.Column<string>(type: "TEXT", nullable: true),
                    brightness = table.Column<double>(type: "REAL", nullable: false),
                    saturate = table.Column<double>(type: "REAL", nullable: false),
                    contrast = table.Column<double>(type: "REAL", nullable: false),
                    sepia = table.Column<int>(type: "INTEGER", nullable: false),
                    rotate_x = table.Column<int>(type: "INTEGER", nullable: false),
                    rotate_y = table.Column<int>(type: "INTEGER", nullable: false),
                    rotate_z = table.Column<int>(type: "INTEGER", nullable: false),
                    top = table.Column<int>(type: "INTEGER", nullable: false),
                    right = table.Column<int>(type: "INTEGER", nullable: false),
                    bottom = table.Column<int>(type: "INTEGER", nullable: false),
                    left = table.Column<int>(type: "INTEGER", nullable: false),
                    blur = table.Column<double>(type: "REAL", nullable: false),
                    text = table.Column<string>(type: "TEXT", nullable: true),
                    fontsize = table.Column<double>(type: "REAL", nullable: false),
                    textcolor = table.Column<string>(type: "TEXT", nullable: true),
                    text_x = table.Column<int>(type: "INTEGER", nullable: false),
                    text_y = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_imageData", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "imageData");
        }
    }
}
