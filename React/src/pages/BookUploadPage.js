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
  Container
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HomeNav from "../components/header/HomeNav";
import Footer from "../components/footer/Footer";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { userBookActions } from "../store/userBook";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

export default function BookUploadPage() {
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const fileInputRef = useRef(null);

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

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.style.backgroundColor = "white";
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (file) {
      const newBook = {
        id: uuidv4(),
        title: data.get("title"),
        description: data.get("description"),
        user: user,
        likes: 0,
        views: 0,
        department: data.get("department"),
        year: data.get("year"),
        course: data.get("course"),
        file: file,
        date: new Date(),
        materialType: "Book",
        comments: [],
      };
      dispatch(userBookActions.addBook(newBook));
    } else {
      alert("Please select a file");
    }
  };

  const handleFileUpload = () => {
    console.log(fileInputRef.current.files);
    fileInputRef.current.click();
  };

  return (
    <>
      <HomeNav />
      <Container maxWidth="md" sx={{ marginTop: "5rem" }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            sx={{ width: "lg" }}
          >
            <Box width="50%">
              <Typography variant="h6" color="primary" gutterBottom>
                Material Information{" "}
              </Typography>{" "}
              <Typography variant="subtitle2" color="#000" gutterBottom>
                Enter the following information about the book
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="Title"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="Description"
                autoFocus
                multiline
                rows={4}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Department
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={handleDepartmentChange}
                  value={department}
                  label="Department"
                >
                  <MenuItem value={"Computer Science"}>
                    Computer Science
                  </MenuItem>
                  <MenuItem value="software-engineering">
                    Software Engineering
                  </MenuItem>
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
                margin="normal"
                required
                fullWidth
                id="course"
                label="Course"
                name="course"
                autoComplete="Course"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                save
              </Button>
            </Box>

            {/* file upload */}
            <Box
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragLeave={handleDragLeave}
              marginTop="5rem"
              style={{
                width: "40%",
                height: "15rem",
                border: "1px dashed black",
                borderRadius: "10px",
                borderShadow: "5px 5px 5px 5px #888888",
              }}
            >
              <input
                accept=".pdf,.doc,.docx"
                id="contained-button-file"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
                ref={fileInputRef}
              />

              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                style={{ width: "100%", height: "15rem", textAlign: "center" }}
              >
                {file ? (
                  <Typography variant="subtitle1" gutterBottom>
                    File selected: {file.name}
                  </Typography>
                ) : (
                  <Typography variant="subtitle2" gutterBottom>
                    Drop your file here or click the button to upload
                  </Typography>
                )}
              </Box>
              <Button
                variant="contained"
                required
                color="primary"
                component="span"
                startIcon={<CloudUploadIcon />}
                onClick={handleFileUpload}
                style={{ marginTop: "1rem", marginLeft: "1rem" }}
              >
                Browse File
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
