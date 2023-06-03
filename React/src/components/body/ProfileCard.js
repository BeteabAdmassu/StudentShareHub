import React from "react";
import { Box, Button, CardMedia, Paper, Typography } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Modal from "./Modal";
import MyPDFViewer from "./MyPDFViewer";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PostAddIcon from "@mui/icons-material/PostAdd";
import EditModal from "./EditModal";
import { useDispatch } from "react-redux";


export default function ProfileCard(props) {
  const [openPost, setOpenPost] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [editAction, setEditAction] = React.useState(false);
  const [videoEdit, setVideoEdit] = React.useState(false);

  const dispatch = useDispatch();

  const handlePostClick = () => {
    setOpenPost(true);
  };
  const handleEditClick = () => {
    setOpenEdit(true);
  };
  const handleDeleteClick = () => {
    dispatch({type: "DELETE_USER"})
    setOpenDelete(true);
  };
  return (
    <>
     {editAction && (
        <EditModal
          open={editAction}
          onClose={() => setEditAction(false)}
          id={props.book.id}
          button="Edit"
          material="Book"
          heading="Edit Book"
          message="Are you sure you want to edit this book?"
          book = {props.book}
        />
      )}
      {openPost && (
        <Modal
          open={openPost}
          onClose={() => setOpenPost(false)}
          id={props.book.id}
          button="Post"
          material="Book"
          title=" Ready to Publish Your Book?"
          message="Before proceeding, we want to make sure that you are absolutely certain about posting your book publicly. This action will make it available to a wide audience"
        />
      )}
      {openEdit && (
        <Modal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          id={props.book.id}
          button="Edit"
          material="Book"
          title="Edit Book"
          message="Are you sure you want to edit this book?"
          edit = {setEditAction}
        />
      )}
      {openDelete && (
        <Modal
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          id={props.book.id}
          button="Delete"
          material="Book"
          title="Delete Book"
          message="Are you sure you want to delete this book?"
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
        <Box>
          <MyPDFViewer pdf={props.book.filePath} />
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
              {props.book.title}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                marginBottom: "0.5rem",
                maxWidth: "100%",
              }}
            >
              {props.book.date}
            </Typography>

            <Typography
              variant="subtitle1"
              color="primary"
              sx={{ marginLeft: "0.5rem", fontWeight: "bold" }} // Added fontWeight: "bold"
            >
              posted: {props.book.submitted.toString()}
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
                {props.book.likes}
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
                {props.book.views}
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
