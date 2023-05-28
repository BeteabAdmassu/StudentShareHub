import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Typography,
  TextField,
  Box,
  Container,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import HomeNav from "../components/header/HomeNav";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/body/Loading";
import GenericAlert from "../components/body/GenericAlert";

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
  const data = useSelector((state) => state.user.data);
  const [Department, setDepartment] = useState("");
  const [Year, setYear] = useState("");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isPaswordChangeOpen, setIsPasswordChangeOpen] = useState(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
  const [isOption, setIsOption] = useState(true);
  const [profilePicture, setProfilePicture] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setProfilePicture(data.profilePicture);
    setDepartment(data.department);
    setYear(data.year);
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  }, [showAlert, data.profilePicture, data.department, data.year]);

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // submit handler
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
  
    // Get the file input element
    const fileInput = e.currentTarget.querySelector('input[type="file"]');
    // Check if a file is selected
    if (fileInput.files.length > 0) {
      // Append the file with the appropriate content type
      data.append("profilePicture", fileInput.files[0], fileInput.files[0].name);
    }
  
    setIsLoading(true);
    await new Promise((resolve, reject) => {
      dispatch({
        type: "UPDATE_USER",
        payload: {
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          department: data.get("department"),
          year: data.get("year"),
          profilePicture: data.get("profilePicture"),
        },
        callback: () => {
          setIsLoading(false);
          setIsEditProfileOpen(false);
          setIsOption(true);
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

  const handlePasswordChangeSubmit = (e) => {
    e.preventDefault();
    setIsPasswordChangeOpen(false);
    setIsOption(true);
  };

  //Event Handler

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
    isOption && setIsOption(false);
  };

  const handleDeleteProfileClick = () => {
    setIsDeleteAccountOpen(!isDeleteAccountOpen);
  };

  const handlePasswordProfileClick = () => {
    setIsPasswordChangeOpen(true);
    isOption && setIsOption(false);
  };

  return (
    <>
      {showAlert && (
        <GenericAlert
          severity="success"
          message="You have successfully Updated your Credential"
          position={{ bottom: "20px", left: "20px" }}
        />
      )}
      {isLoading && <Loading />}
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
          {isOption && (
            <Container
              component="main"
              maxWidth="xs"
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
                paddingBottom: "5rem",
                overflow: "hidden",
              }}
            >
              {/* Profile */}
              <Avatar
                alt="Profile Picture"
                src={profilePicture}
                sx={{ width: 100, height: 100, my: 2 }}
              />
              <Typography
                variant="h4"
                component="h2"
                style={{ marginTop: "10px", fontWeight: "bold" }}
              >
                {data.firstName} {data.lastName}
              </Typography>
              <Typography
                variant="subtitle1"
                style={{ marginTop: "10px", color: "#666" }}
              >
                {data.email}
              </Typography>
              <Typography
                variant="subtitle1"
                style={{ marginTop: "10px", color: "#666" }}
              >
                {data.department}
              </Typography>
              <Typography
                variant="subtitle1"
                style={{ marginTop: "10px", color: "#666" }}
              >
                Year:{" "}
                <span style={{ marginLeft: "5px", fontWeight: "bold" }}>
                  {data.year}
                </span>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "20px", width: "100%", fontWeight: "bold" }}
                onClick={handleEditProfileClick}
              >
                Edit Profile
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "20px", width: "100%", fontWeight: "bold" }}
                onClick={handlePasswordProfileClick}
              >
                Change Password
              </Button>
              <Button
                variant="contained"
                color="error"
                style={{ marginTop: "20px", width: "100%", fontWeight: "bold" }}
                onClick={handleDeleteProfileClick}
              >
                Delete Account
              </Button>
            </Container>
          )}

          {isEditProfileOpen && (
            <Container
              component="main"
              maxWidth="xs"
              sx={{
                borderRadius: "10px",
                border: "1px solid #e0e0e0",
                paddingBottom: "5rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 3,
                }}
              >
                <Box width="100%">
                  <IconButton
                    onClick={() => {
                      setIsEditProfileOpen(false);
                      setIsOption(true);
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </Box>

                <Avatar
                  alt="Profile Picture"
                  src={profilePicture}
                  sx={{ width: 100, height: 100, my: 2 }}
                />
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{ fontWeight: "bold", mb: 2 }}
                >
                  Edit Profile
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleEditSubmit}
                  sx={{ width: "100%" }}
                >
                  <input
                    accept="image/*"
                    id="profile-picture-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleProfilePictureChange}
                  />
                  <label htmlFor="profile-picture-upload">
                    <Button
                      variant="contained"
                      component="span"
                      fullWidth
                      sx={{ mb: 2 }}
                    >
                      Upload Profile Picture
                    </Button>
                  </label>
                  <Box sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
                    <TextField
                      required
                      name="firstName"
                      label="First Name"
                      defaultValue={data.firstName}
                      margin="normal"
                      variant="outlined"
                      sx={{ flex: "1", mr: 1 }}
                    />
                    <TextField
                      required
                      name="lastName"
                      label="Last Name"
                      defaultValue={data.lastName}
                      margin="normal"
                      variant="outlined"
                      sx={{ flex: "1", ml: 1 }}
                    />
                  </Box>
                  <TextField
                    fullWidth
                    disabled
                    label="Email"
                    value={data.email}
                    margin="normal"
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                  <InputLabel id="department-label">Department</InputLabel>
                  <Select
                    fullWidth
                    name="department"
                    labelId="department-label"
                    id="department-select"
                    value={Department}
                    onChange={handleDepartmentChange}
                    defaultValue={data.department}
                    label="Department"
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value={"Software Engineering"}>
                      Software Engineering
                    </MenuItem>
                    <MenuItem value="Computer Science">
                      Computer Science
                    </MenuItem>
                  </Select>
                  <InputLabel id="year-label">Year</InputLabel>
                  <Select
                    fullWidth
                    name="year"
                    labelId="year-label"
                    id="year-select"
                    defaultValue={data.year}
                    value={Year}
                    onChange={handleYearChange}
                    label="Year"
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value={1}>1st Year</MenuItem>
                    <MenuItem value={2}>2nd Year</MenuItem>
                    <MenuItem value={3}>3rd Year</MenuItem>
                    <MenuItem value={4}>4th Year</MenuItem>
                  </Select>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="contained" color="primary" type="submit">
                      Save
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Container>
          )}

          {isPaswordChangeOpen && (
            <Container
              component="main"
              maxWidth="xs"
              sx={{
                borderRadius: "10px",
                border: "1px solid #e0e0e0",
                paddingBottom: "5rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 3,
                }}
              >
                <Box width="100%">
                  <IconButton
                    onClick={() => {
                      setIsPasswordChangeOpen(false);
                      setIsOption(true);
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </Box>

                <Avatar
                  alt="Profile Picture"
                  src={profilePicture}
                  sx={{ width: 100, height: 100, my: 2 }}
                />
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{ fontWeight: "bold", mb: 2 }}
                >
                  Change Password
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handlePasswordChangeSubmit}
                  sx={{ width: "100%" }}
                >
                  <TextField
                    fullWidth
                    required
                    label="Current Password"
                    type="password"
                    margin="normal"
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    required
                    label="New Password"
                    type="password"
                    margin="normal"
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="contained" color="primary" type="submit">
                      Save
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Container>
          )}
        </div>
      </Container>

      {isDeleteAccountOpen && (
        <Modal
          open={true}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          onClick={handleDeleteProfileClick}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 400,
              bgcolor: "#f5f5f5",
              p: 3,
              borderRadius: "4px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box width="100%" display="flex" justifyContent="flex-end" mb={1}>
              <Button
                onClick={() => {
                  handleDeleteProfileClick();
                }}
              >
                <CloseIcon />
              </Button>
            </Box>
            <Typography variant="h6" component="h2" fontWeight="bold">
              Account Deletion
            </Typography>
            <Typography sx={{ mt: 2, fontSize: 16 }}>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 3,
              }}
            >
              <Button variant="contained" color="error" sx={{ mr: 2 }}>
                Delete Account
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleDeleteProfileClick}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
}
