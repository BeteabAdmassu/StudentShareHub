import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Container,
} from "@mui/material";
import HomeNav from "../components/header/HomeNav";
import Footer from "../components/footer/Footer";

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
export default function BookUploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [course, setCourse] = useState("");
  const [VIDEO_ID, setVIDEO_ID] = useState("");
  const VIDEO_SRC = `https://www.youtube.com/embed/${VIDEO_ID}`;
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  const handleSaveClick = () => {
    // TODO: Implement saving logic
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.style.backgroundColor = "lightgray";
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.style.backgroundColor = "white";
  };

  return (
    <>
      <HomeNav />
      <Container maxWidth="md" sx={{ marginTop: "5rem" }}>
        <Box
          display="flex"
          flexDirection="row"

          justifyContent="space-between"
          sx={{ width: "lg" }}
        >
          <Box width="50%">
            <Typography variant="h6" color="primary" gutterBottom>
              Material Information{" "}
            </Typography>
            <Typography variant="subtitle2" color="#000" gutterBottom>
              Enter the following information about of the video
            </Typography>

            <form noValidate autoComplete="off">
              <TextField
                fullWidth
                required
                label="Title"
                value={title}
                onChange={handleTitleChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                required
                label="Description"
                value={description}
                onChange={handleDescriptionChange}
                margin="normal"
                multiline
                rows={4}
                variant="outlined"
              />
              <FormControl
                fullWidth
                required
                margin="normal"
                variant="outlined"
              >
                <InputLabel id="department-label">Department</InputLabel>
                <Select
                  labelId="department-label"
                  id="department-select"
                  value={department}
                  onChange={handleDepartmentChange}
                  label="Department"
                >
                  <MenuItem value="software-engineering">
                    Software Engineering
                  </MenuItem>
                  <MenuItem value="computer-science">Computer Science</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                required
                margin="normal"
                variant="outlined"
              >
                <InputLabel id="year-label">Year</InputLabel>
                <Select
                  labelId="year-label"
                  id="year-select"
                  value={year}
                  onChange={handleYearChange}
                  label="Year"
                >
                  <MenuItem value={1}>1st Year</MenuItem>
                  <MenuItem value={2}>2nd Year</MenuItem>
                  <MenuItem value={3}>3rd Year</MenuItem>
                  <MenuItem value={4}>4th Year</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                required
                label="Course"
                value={course}
                onChange={handleCourseChange}
                margin="normal"
                variant="outlined"
              />
              {/* add a link input */}
              <TextField
                fullWidth
                label="Link"
                margin="normal"
                required
                variant="outlined"
                onChange={(e) => {
                  setVIDEO_ID(getYouTubeVideoId(e.target.value));
                }}
              />
            </form>
            <Box sx={{ display: "flex", justifyContent: "right" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveClick}
              >
                Save
              </Button>
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" marginTop='3rem' >
            <Typography textAlign='left' variant="h6"  gutterBottom>
              Preview{" "}
            </Typography>
            <iframe
              width="100%"
              src={VIDEO_SRC}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <Box mt={2}>
              <Typography variant="h6">Video Title</Typography>
  
              <Typography variant="body1">Video Description</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
