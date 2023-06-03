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
import { useSelector } from "react-redux";
import Loading from "../components/body/Loading";
import GenericAlert from "../components/body/GenericAlert";
import { useEffect } from "react";


export default function BookUploadPage() {
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();

  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const courseRef = useRef("");
  const fileInputRef = useRef("");


  useEffect(() => {
    
    if (showAlert) {
      setDepartment("");
      setYear("");
      setFile("");
      
       // Resetting input field values using refs
       titleRef.current.value = "";
       descriptionRef.current.value = "";
       courseRef.current.value = "";
       fileInputRef.current.value = "";

      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  }, [showAlert]);

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
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

  const handleSubmit = async (e) => {
  
    e.preventDefault();
    const data = new FormData(e.currentTarget);
  
    // Get the file input element
    const fileInput = e.currentTarget.querySelector('input[type="file"]');
    // Check if a file is selected
    if (fileInput.files.length > 0) {
      // Append the file with the appropriate content type
      data.append("file", fileInput.files[0], fileInput.files[0].name);
    }
  
    setIsLoading(true);
    await new Promise((resolve, reject) => {
      dispatch({
        type: "UPLOAD_BOOK",
        payload: {
        title: data.get("title"),
        description: data.get("description"),
        department: department,
        year: year,
        course: data.get("course"),
        file: file,
        },
        callback: () => {
          setIsLoading(false);
          setShowAlert(true);
          resolve();
        },
        errorCallback: (error) => {
          reject();
          setIsLoading(false);
        },
      });
    });
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <>
    {showAlert && (
        <GenericAlert
          severity="success"
          message="Your book has been successfully saved! You can view it in your profile"
          position={{ bottom: "20px", right: "20px" }}
        />
      )}
      {isLoading && <Loading />}
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
                inputRef={titleRef}
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
                inputRef={descriptionRef}
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
                inputRef={courseRef}
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
