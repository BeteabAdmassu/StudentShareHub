import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Box,
} from "@mui/material";

import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import computerScienceImage from "../assets/computer_science.jpg";
import softwareEngineeringImage from "../assets/software_engineering.jpg";
import Department from "../assets/Department.jpg";
import Footer from "../components/footer/Footer";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import NavBar from "../components/body/NavBar";

function ChooseDepartmentPage() {
  const [value, setValue] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
 
  const departmentSubmitHandler = (event) => {
    event.preventDefault();
    console.log(value);
  };


  return (
    <>
      <NavBar />
      <Container maxWidth="100%">
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Box
            // Hide the image on small devices
            display={{ xs: "none", sm: "none", md: "block" }}
          sx={{ width: '50%'}}
          >
            <img
              src={Department}
              alt="Department"
              style={{
                width: "100%",
                
              }}
            />
          </Box >
          <Box  sx={{ width: '50%'}}>
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
             component="form"
             onSubmit={departmentSubmitHandler}
             required


            >
              <RadioGroup
                name="department"
                value={value}
                onChange={handleChange}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
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
                  value="computerScience"
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
                  value="softwareEngineering"
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
            </Box>
            <Box
              sx={{
                textAlign: { xs: "center", md: "right", marginRight: "5rem" },
              }}
            >
              <Button
                endIcon={<ArrowForwardIosIcon />}
                sx={{ margin: { xs: "1rem 0", md: "2rem 0 2rem 0" } }}
                variant="contained"
                color="primary"
                size="large"
                component={Link}
                to="/choose-year"
             
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
