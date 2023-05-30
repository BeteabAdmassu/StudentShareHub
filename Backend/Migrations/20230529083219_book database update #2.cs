using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class bookdatabaseupdate2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "course",
                table: "Books",
                newName: "Course");

            migrationBuilder.RenameColumn(
                name: "File",
                table: "Books",
                newName: "FilePath");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Course",
                table: "Books",
                newName: "course");

            migrationBuilder.RenameColumn(
                name: "FilePath",
                table: "Books",
                newName: "File");
        }
    }
}
