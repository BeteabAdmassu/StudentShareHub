import React, { useState, useRef} from "react";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
  Avatar,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReplyIcon from "@mui/icons-material/Reply";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import FileViewer from "react-file-viewer";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import BookCardPdf from "../body/BookCardPdf";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useDispatch } from "react-redux";

export default function RightDrawer(props) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [replyIndex, setReplyIndex] = useState(-1);
  const [replyText, setReplyText] = useState("");
  const linkRef = useRef(null);
  const handleReply = (index) => {
    setReplyIndex(index);
  };

   console.log('hello')
  const handleCancelReply = () => {
    setReplyIndex(-1);
    setReplyText("");
  };

  const handleSubmitReply = () => {
    if (replyText.trim()) {
      props.onReply(replyIndex, replyText.trim());
      setReplyIndex(-1);
      setReplyText("");
    }
  };
  const handleDownload = () => {
     dispatch({ type: "DOWNLOAD_BOOK", payload: props.data.filePath });
  };

  const fileNameGenerator = (filePath) => {
    const split = filePath.split("/");
    return split[split.length - 1];
  };
  return (
    <Drawer
      anchor="right"
      open={props.state}
      onClose={props.toggleDrawer(false)}
    >
      <Box sx={{ width: "30rem", padding: "1rem" }} role="presentation">
        {/* close button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={props.toggleDrawer(false)}>
            <CloseIcon />
          </Button>
        </Box>
        {/* image */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
              margin: "1rem",
              marginLeft: "5rem",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={props.data.authorProfilePic}
              sx={{ marginRight: "1rem", width: "2rem", height: "2rem" }}
            />
            <Typography variant="h6">{props.data.author}</Typography>
          </Box>
          <Box width="70%">
          <BookCardPdf pdf={props.data.filePath} />
          </Box>
        
        </Box>

        {/* profile information */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Typography
            variant="h5"
            sx={{ marginBottom: "0.5rem", maxWidth: "100%" }}
          >
            {props.data.title}
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
              {props.data.likes}
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
              {props.data.views}
            </Typography>
          </Button>
        </Box>

        {/* description */}
        <Box sx={{ margin: "2rem" }}>
          <Typography variant="h6">Description</Typography>
          <Typography variant="subtitle1">{props.data.description}</Typography>
        </Box>

        {/* comment section */}
        <Box sx={{ margin: "2rem" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "1rem",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <Typography variant="h6">Comments</Typography>
            {auth.isAuthenticated ? (
              <>
                <form>
                  <TextField
                    id="comment"
                    label="Comment"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                  />
                  <Button variant="contained">Add comment</Button>
                </form>
              </>
            ) : (
              <Button variant="contained" component={Link} to="/signin">
                Add comment
              </Button>
            )}
          </Box>
          {
            <List>
              {props.data.comments.map((comment, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        src="https://via.placeholder.com/50"
                        alt="profile"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={comment.user}
                      secondary={comment.comment}
                    />
                    <IconButton onClick={() => handleReply(index)}>
                      <ReplyIcon />
                    </IconButton>
                  </ListItem>
                  {replyIndex === index && (
                    <Box margin=" 0 3rem 3rem 3rem">
                      <TextField
                        variant="outlined"
                        fullWidth
                        placeholder={`Reply to ${comment.user}`}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <Button variant="contained" onClick={handleSubmitReply}>
                        Reply
                      </Button>
                      <Button variant="outlined" onClick={handleCancelReply}>
                        Cancel
                      </Button>
                    </Box>
                  )}
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          }
        </Box>
      </Box>
      {/* download button */}
      <Box sx={{ position: "fixed", bottom: 0, right: "6rem" }}>
        <Button
          variant="contained"
          startIcon={<CloudDownloadIcon />}
          sx={{ marginBottom: "1rem" }}
          onClick={handleDownload}

        >
          Download
        </Button>
      </Box>
      {/* download button */}
      <Box sx={{ position: "fixed", bottom: 0, right: "17rem" }}>
        <Button
          variant="contained"
          startIcon={<OpenInNewIcon />}
          sx={{ marginBottom: "1rem" }}
         onClick= {() => window.open(props.data.filePath, "_blank")}
        >
          Open File
        </Button>
      </Box>
    </Drawer>
  );
}
