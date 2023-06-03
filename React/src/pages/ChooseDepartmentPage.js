import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  Container,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import computerScienceImage from "../assets/computer_science.jpg";
import softwareEngineeringImage from "../assets/software_engineering.jpg";
import Department from "../assets/Department.jpg";
import Footer from "../components/footer/Footer";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import NavBar from "../components/body/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { call } from "redux-saga/effects";
import Loading from "../components/body/Loading";
import { setTempData} from "../store/user-slice"


function ChooseDepartmentPage() {
  const [value, setValue] = useState("Computer Science");
  const [isLoading, setIsLoading] = useState(false);
  const [year, setYear] = useState(1);
  const userData = useSelector((state) => state.user.data);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (auth.isAuthenticated) {

  await new Promise((resolve, reject) => {
    dispatch({
      type: "UPDATE_USER",
      payload: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        department: value,
        year: year,
      },
        callback: () => {
          setIsLoading(false);
          navigate("/home");
          resolve();
        },
        errorCallback: (error) => {
          reject();
          setIsLoading(false);
          navigate("/home");
        },
      });
    });
  };
};



  return (
    <>
      {isLoading && <Loading />}
      <NavBar />
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Box
            // Hide the image on small devices
            display={{ xs: "none", sm: "none", md: "block" }}
            sx={{ width: "50%" }}
          >
            <img
              src={Department}
              alt="Department"
              style={{
                width: "100%",
              }}
            />
          </Box>
          <Box sx={{ width: "50%" }}>
            <Typography variant="h5" gutterBottom>
              Choose Your Department
            </Typography>
            <Typography variant="body1" paragraph>
              To get more relevant resources, choose the department you are
              enrolled in.
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "center" },
              }}
              required
              width="100%"
            >
              <RadioGroup
                name="department"
                value={value}
                onChange={handleChange}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  width: "100rem",
                }}
              >
                <FormControlLabel
                  sx={{
                    margin: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: { xs: "100%", sm: "100%", lg: "30%", xl: "30%" },
                  }}
                  value="Computer Science"
                  control={<Radio />}
                  label={
                    <>
                      <img
                        src={computerScienceImage}
                        alt="Computer Science"
                        style={{
                          display: "block",
                          width: "100%",
                          height: { xs: "10rem", sm: "16rem" },
                        }}
                      />
                      Computer Science
                    </>
                  }
                />
                <FormControlLabel
                  sx={{
                    margin: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: { xs: "100%", sm: "100%", lg: "30%", xl: "30%" },
                  }}
                  value="Software Engineering"
                  control={<Radio />}
                  label={
                    <>
                      <img
                        src={softwareEngineeringImage}
                        alt="Software Engineering"
                        style={{
                          display: "block",
                          width: "100%",
                          height: { xs: "10rem", sm: "16rem" },
                        }}
                      />
                      Software Engineering
                    </>
                  }
                />
              </RadioGroup>
              <FormControl
                required
                margin="normal"
                variant="outlined"
                fullWidth
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
              <Box
                sx={{
                  textAlign: { xs: "center", md: "right" },
                }}
              ></Box>
            </Box>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
              <Button
                endIcon={<ArrowForwardIosIcon />}
                sx={{ margin: { xs: "1rem 0", md: "2rem 0 2rem 0" } }}
                variant="contained"
                color="primary"
                size="large"
                onClick={submitHandler}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default ChooseDepartmentPage;
