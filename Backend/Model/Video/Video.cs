using Backend.Model.Book;

namespace Backend.Model.Video
{
    public class Video:VideoUploadModel
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public int Likes { get; set; } = 0;

        public int views { get; set; } = 0;

        public string MaterialType { get; set; }="Video";

        public DateOnly Date { get; set; }

        public Comment[] Comments { get; set; }
    }
}