import React from "react";
import { Typography, Box, Container, MenuItem, Select } from "@mui/material";
import HomeNav from "../components/header/HomeNav";

const drawerWidth = 240;

const styles = {
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: "20px",
  },
  userInformation: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
    padding: "25px",
    border: "1px solid #e0e0e0",
    borderRadius: "10px",
  },
  button: {
    marginTop: "20px",
  },
};

export default function ProfilePage() {
  return (
    <>
      <HomeNav />
      <Container sx={{ marginTop: "5rem" }}>
        <div style={styles.root}>
          <div style={styles.content}>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                marginBottom: "10px",
                padding: "10px 20px",
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
              }}
            >
              <Typography variant="h5" textAlign="left" color="primary">
                My Materials
              </Typography>
              <Box ml="auto" display="flex" alignItems="center">
                <Select value="book" variant="standard" sx={{ width: "10rem" }}>
                  <MenuItem value="book">Book</MenuItem>
                  <MenuItem value="video">Video</MenuItem>
                  <MenuItem value="quiz">Quiz</MenuItem>
                </Select>
              </Box>
              <Box></Box>
            </Box>
          </div>
        </div>
      </Container>
    </>
  );
}
