import React, { useState } from "react";
import {
  Avatar,
  Button,
  Typography,
  TextField,
  Box,
  Container,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import HomeNav from "../components/header/HomeNav";
import CloseIcon from "@mui/icons-material/Close";

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
    padding : "25px",
    border : "1px solid #e0e0e0",
    borderRadius : "10px"
   },
  button: {
    marginTop: "20px",
  },
};

export default function ProfilePage() {
  const [selectedDrawerItem, setSelectedDrawerItem] = useState("Book");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [course, setCourse] = useState("");

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  };

  const handleEditProfileCancel = () => {
    setIsEditProfileOpen(false);
  };

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
  const handleEditProfileSave = () => {};

  return (
    <>
      <HomeNav />
      <Container sx={{ marginTop: "5rem" }}>
        <div style={styles.root}>
          <div style={styles.content}>
            <Box display="flex" alignItems="center" sx={{ marginBottom: '10px',padding: '10px 20px', border : "1px solid #e0e0e0", borderRadius:"10px"}}>
              <Typography variant="h5" textAlign="left" color="primary">
                My Materials
              </Typography>
              <Box ml="auto" display="flex" alignItems="center">
              
                <Select value="book" variant="standard" sx={{ width: '10rem'}}>
                  <MenuItem value="book">Book</MenuItem>
                  <MenuItem value="video">Video</MenuItem>
                  <MenuItem value="quiz">Quiz</MenuItem>
                </Select>
              </Box>
               <Box>
                
               </Box>


            </Box>
           
          </div>
          <div style={styles.userInformation}>
            <Avatar
              alt="User Avatar"
              src="/user_avatar.jpg"
              style={{ width: "100px", height: "100px" }}
            />
            <Typography
              variant="h6"
              component="h2"
              style={{ marginTop: "10px" }}
            >
              John Doe
            </Typography>
            <Typography variant="subtitle1" style={{ marginTop: "10px" }}>
              john.doe@example.com
            </Typography>
            <Typography variant="subtitle1" style={{ marginTop: "10px" }}>
              Computer Science
            </Typography>
            <Typography variant="subtitle1" style={{ marginTop: "10px" }}>
              Year: 3
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={styles.button}
              onClick={handleEditProfileClick}
            >
              Edit Profile
            </Button>
          </div>

          {isEditProfileOpen && (
            <Box
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "scroll",
              }}
              onClick={handleEditProfileCancel}
            >
              <Box
                style={{
                  margin: "auto",
                  marginTop: "5rem",
                  backgroundColor: "white",
                  padding: "25px",
                  borderRadius: "5px",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
                  width: "30%",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button onClick={handleEditProfileCancel}>
                    <CloseIcon />
                  </Button>
                </Box>
                <Typography variant="h5" component="h2">
                  Edit Profile
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "2rem",
                  }}
                >
                  <Avatar
                    alt="User Avatar"
                    src="/user_avatar.jpg"
                    style={{ width: "100px", height: "100px" }}
                  />
                </Box>
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
                      <MenuItem value="computer-science">
                        Computer Science
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
                    fullWidth
                    required
                    label="Course"
                    value={course}
                    onChange={handleCourseChange}
                    margin="normal"
                    variant="outlined"
                  />
                </form>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "1rem",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEditProfileSave}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </div>
      </Container>
    </>
  );
}
