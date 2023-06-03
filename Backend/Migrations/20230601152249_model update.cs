using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class modelupdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Books_BookId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Videos_VideoId",
                table: "Comments");

            migrationBuilder.RenameColumn(
                name: "VideoId",
                table: "Comments",
                newName: "VideoModelId");

            migrationBuilder.RenameColumn(
                name: "BookId",
                table: "Comments",
                newName: "BookModelId");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_VideoId",
                table: "Comments",
                newName: "IX_Comments_VideoModelId");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_BookId",
                table: "Comments",
                newName: "IX_Comments_BookModelId");

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Videos",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Books",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Videos_ApplicationUserId",
                table: "Videos",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Books_ApplicationUserId",
                table: "Books",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_AspNetUsers_ApplicationUserId",
                table: "Books",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Books_BookModelId",
                table: "Comments",
                column: "BookModelId",
                principalTable: "Books",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Videos_VideoModelId",
                table: "Comments",
                column: "VideoModelId",
                principalTable: "Videos",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Videos_AspNetUsers_ApplicationUserId",
                table: "Videos",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_AspNetUsers_ApplicationUserId",
                table: "Books");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Books_BookModelId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Videos_VideoModelId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Videos_AspNetUsers_ApplicationUserId",
                table: "Videos");

            migrationBuilder.DropIndex(
                name: "IX_Videos_ApplicationUserId",
                table: "Videos");

            migrationBuilder.DropIndex(
                name: "IX_Books_ApplicationUserId",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Videos");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Books");

            migrationBuilder.RenameColumn(
                name: "VideoModelId",
                table: "Comments",
                newName: "VideoId");

            migrationBuilder.RenameColumn(
                name: "BookModelId",
                table: "Comments",
                newName: "BookId");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_VideoModelId",
                table: "Comments",
                newName: "IX_Comments_VideoId");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_BookModelId",
                table: "Comments",
                newName: "IX_Comments_BookId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Books_BookId",
                table: "Comments",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Videos_VideoId",
                table: "Comments",
                column: "VideoId",
                principalTable: "Videos",
                principalColumn: "Id");
        }
    }
}
