import React from "react";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  IconButton,
  Divider,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReplyIcon from "@mui/icons-material/Reply";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

export default function RightDrawer(props) {
  return (
    <div>
      {/* button to open the drawer */}
      {/* drawer */}
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
            <img src="https://via.placeholder.com/300x200" alt="example" />
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
              Title DrawerVideo
            </Typography>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="https://via.placeholder.com/50"
                sx={{ marginRight: "1rem", width: "2rem", height: "2rem" }}
              />
              <Typography variant="body">User Name</Typography>
            </Box>
          </Box>

          {/* like and download buttons */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="text" sx={{ marginRight: "1rem" }}>
              <ThumbUpAltIcon sx={{ marginRight: "0.5rem" }} />
              Like
              <Typography
                variant="subtitle2"
                color="textSecondary"
                sx={{ marginLeft: "0.5rem" }}
              >
                50 Likes
              </Typography>
            </Button>

            {/* Views */}
            <Button variant="text">
              <VisibilityIcon sx={{ marginRight: "0.5rem" }} />
              Views
              <Typography
                variant="subtitle2"
                color="textSecondary"
                sx={{ marginLeft: "0.5rem" }}
              >
                100 Views
              </Typography>
            </Button>
          </Box>

          {/* description */}
          <Box sx={{ marginTop: "2rem" }}>
            <Typography variant="h6">Description</Typography>
            <Typography variant="body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquam nisl,
              et lacinia nisl nisl eget nisl. Sed tincidunt, nisl eget ultricies
              tincidunt, nisl nisl aliquam nisl, et lacinia nisl nisl eget nisl.
              Sed tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquam
              nisl, et lacinia nisl nisl eget nisl. Sed tincidunt, nisl eget
              ultricies tincidunt, nisl nisl aliquam nisl, et lacinia nisl nisl
            </Typography>
          </Box>

          {/* comment section */}
          <Box sx={{ marginTop: "2rem" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              {" "}
              <Typography variant="h6">Comments</Typography>
              <Button variant="text" sx={{ marginLeft: "auto" }}>
                Add Comment
              </Button>
            </Box>
            <List>
              {[...Array(5)].map((_, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        src="https://via.placeholder.com/50"
                        alt="profile"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Commenter Name"
                      secondary="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    />
                    <IconButton>
                      <ReplyIcon />
                    </IconButton>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Box>
        </Box>
        {/* download button */}
        <Box sx={{ position: "fixed", bottom: 0, right: "11rem" }}>
          <Button
            variant="contained"
            startIcon={<CloudDownloadIcon />}
            sx={{ marginBottom: "1rem" }}
          >
            Download
          </Button>
        </Box>
      </Drawer>
    </div>
  );
}

