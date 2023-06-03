import React from "react";
import { Box, Button, CardMedia, Paper, Typography } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import dummy from "../../assets/dummy.jpg";
import Modal from "./Modal";
import MyPDFViewer from "./MyPDFViewer";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PostAddIcon from "@mui/icons-material/PostAdd";
import EditModal from "./EditModal";
import { useState } from "react";

function getYouTubeVideoId(url) {
    // Match the video ID pattern in the YouTube URL
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|(?:embed|v)\/))([\w-]{11})/
    );
  
    if (match) {
      // Extract the video ID from the match
      return match[1];
    } else {
      // The URL doesn't match the expected pattern
      return null;
    }
  }

export default function ProfileCard(props) {
  const [openPost, setOpenPost] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [editAction, setEditAction] = React.useState(false);
  const [VIDEO_ID, setVIDEO_ID] = useState(getYouTubeVideoId(props.video.videoUrl));
  const VIDEO_SRC = `https://www.youtube.com/embed/${VIDEO_ID}`;
  const handlePostClick = () => {
    setOpenPost(true);
  };
  const handleEditClick = () => {
    setOpenEdit(true);
  };
  const handleDeleteClick = () => {
    setOpenDelete(true);
  };
  return (
    <>
      {editAction && (
        <EditModal
          open={editAction}
          onClose={() => setEditAction(false)}
          id={props.video.id}
          button="Edit"
          material="Video"
          heading="Edit Video"
          message="Are you sure you want to edit this video?"
          book = {props.video}
        />
      )}
      {openPost && (
        <Modal
          open={openPost}
          onClose={() => setOpenPost(false)}
          id={props.video.id}
          button="Post"
          material="Video"
          title=" Ready to Publish Your Video?"
          message="Before proceeding, we want to make sure that you are absolutely certain about posting your Video publicly. This action will make it available to a wide audience"
        />
      )}
      {openEdit && (
        <Modal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          id={props.video.id}
          button="Edit"
          material="Video"
          title="Edit video"
          message="Are you sure you want to edit this video?"
          edit = {setEditAction}
        />
      )}
      {openDelete && (
        <Modal
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          id={props.video.id}
          button="Delete"
          material="Video"
          title="Delete video"
          message="Are you sure you want to delete this video?"
        />
      )}
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "1rem",
        }}
      >
        <Box sx={{ display:'flex', justifyContent:'center' }}>
          <iframe
            src={VIDEO_SRC}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{ maxWidth: "10rem", maxHeight: "100%" }}
            allowFullScreen
          ></iframe>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginBottom: "0.5rem",
                maxWidth: "100%",
                marginTop: "0.5rem",
              }}
            >
              {props.video.title}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                marginBottom: "0.5rem",
                maxWidth: "100%",
              }}
            >
              {props.video.date}
            </Typography>

            <Typography
              variant="subtitle1"
              color="primary"
              sx={{ marginLeft: "0.5rem", fontWeight: "bold" }} // Added fontWeight: "bold"
            >
              posted: {props.video.submitted.toString()}
            </Typography>
          </Box>

          {/* like and download buttons */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="text" sx={{ marginRight: "1rem" }}>
              <ThumbUpAltIcon sx={{ marginRight: "0.5rem" }} />
              LIKE
              <Typography
                variant="subtitle2"
                color="textSecondary"
                sx={{ marginLeft: "0.5rem" }}
              >
                {props.video.likes}
              </Typography>
            </Button>

            {/* Views */}
            <Button variant="text">
              <VisibilityIcon sx={{ marginRight: "0.5rem" }} />
              VIEWS
              <Typography
                variant="subtitle2"
                color="textSecondary"
                sx={{ marginLeft: "0.5rem" }}
              >
                {props.video.views}
              </Typography>
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start ",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "10px" }}
            onClick={handlePostClick}
            fullWidth
          >
            <PostAddIcon />
            {/* Add the desired icon component here */}
          </Button>

          <Button
            variant="contained"
            fullWidth
            color="primary"
            style={{ margin: "10px" }}
            onClick={handleEditClick}
          >
            <EditIcon /> {/* Add the desired icon component here */}
          </Button>

          <Button
            variant="contained"
            color="error"
            style={{ margin: "10px" }}
            fullWidth
            onClick={handleDeleteClick}
          >
            <DeleteIcon /> {/* Add the desired icon component here */}
          </Button>
        </Box>
      </Paper>
    </>
  );
}
