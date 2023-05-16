import React from "react";
import { CssBaseline, Container, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Images from "../../assets/illustrator.jpg";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Hilcoe from "../../assets/Hilcoe.png";
import Resource from "../../assets/Resource.jpg";
import Assessment from "../../assets/Assesment.jpg";
import Search from "../../assets/Search.jpg";
import Exam from "../../assets/Exam.jpg";



export default function SimpleContainer() {
  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <Box marginTop="4rem" sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            p: 4,
          }}
        >
          <Box maxWidth="sm" textAlign="left">
            <Typography variant="h3" gutterBottom>
              StudentShareHub
            </Typography>
            <Typography variant="h4" gutterBottom>
              Learning together
            </Typography>
            <Typography variant="body1" gutterBottom>
              A platform where students can create free accounts to access and
              share relevant resources.
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2, mr: 2, borderRadius: "10px", fontWeight: "Bold" }}
              endIcon={<ArrowForwardIosIcon />}
              component={Link}
              to="/choose-department"
            >
              Get Started
            </Button>
          </Box>
        </Box>
        <Box sx={{ p: 4 }}>
          <img
            src={Images}
            alt="Illustrator"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Box>
      </Box>

      <Box margin="3rem" maxWidth="xl">
        <img src={Hilcoe} alt="Hilcoe" style={{ maxHeight: "10vh" }} />
      </Box>
      <Box
        margin="3em"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Typography variant="h5" sx={{ fontWeight: "700" }} gutterBottom>
          Services We Provide
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 290,
            height: 490,
          },
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            borderRadius: "20px",
            textDecoration: "none",
            "&:hover": {
              cursor: "pointer",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              backgroundColor: "#2b6cb0",
              color: 'white'
            },
          }}
          component={Link}
          to="/choose-department"
        >
          <Box>
            <Box>
              <img src={Resource} alt="Resource" style={{ maxWidth: "100%" }} />
            </Box>
            <Box>
              <Typography
                marginLeft="1rem"
                variant="h5"
                sx={{ fontWeight: "700", textAlign: "left" }}
                gutterBottom
              >
                Resources
              </Typography>
              <Typography
                marginLeft="1rem"
                variant="body1"
                sx={{ textAlign: "left" }}
                gutterBottom
              >
                Access dowloadable PDFs, videos, quizes from known sources,
                simulated exams, and informative websites for all your courses.
              </Typography>
            </Box>
          </Box>
        </Paper>
        <Paper
          elevation={10}
          sx={{
            borderRadius: "20px",
            textDecoration: "none",
            "&:hover": {
              cursor: "pointer",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              backgroundColor: "#2b6cb0",
              color: 'white'
            },
          }}
          component={Link}
          to="/choose-department"
        >
          <Box>
            <Box>
              <img
                src={Assessment}
                alt="Assessment"
                style={{ maxWidth: "100%" }}
              />
            </Box>
            <Box>
              <Typography
                marginLeft="1rem"
                variant="h5"
                sx={{ fontWeight: "700", textAlign: "left" }}
                gutterBottom
              >
                Assesments
              </Typography>
              <Typography
                marginLeft="1rem"
                variant="body1"
                sx={{ textAlign: "left" }}
                gutterBottom
              >
                Simulate the experience of taking a real exam with a time limit
                and get your results when finished.
              </Typography>
            </Box>
          </Box>
        </Paper>
        <Paper
          elevation={10}
          sx={{
            borderRadius: "20px",
            textDecoration: "none",
            "&:hover": {
              cursor: "pointer",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              backgroundColor: "#2b6cb0",
              color: 'white'
            },
          }}
          component={Link}
          to="/choose-department"
        >
          <Box>
            <Box>
              <img src={Exam} alt="Exam" style={{ maxWidth: "100%" }} />
            </Box>
            <Box>
              <Typography
                marginLeft="1rem"
                variant="h5"
                sx={{ fontWeight: "700", textAlign: "left" }}
                gutterBottom
              >
                Practice Exams
              </Typography>
              <Typography
                marginLeft="1rem"
                variant="body1"
                sx={{ textAlign: "left" }}
                gutterBottom
              >
                Take informal practice assessments with provided solutions.
              </Typography>
            </Box>
          </Box>
        </Paper>
        <Paper
          elevation={10}
          sx={{
            borderRadius: "20px",
            textDecoration: "none",
            "&:hover": {
              cursor: "pointer",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              backgroundColor: "#2b6cb0",
              color: 'white'
            },
          }}
          component={Link}
          to="/choose-department"
        >
          <Box>
            <Box>
              <img src={Search} alt="Search" style={{ maxWidth: "100%" }} />
            </Box>
            <Box>
              <Typography
                marginLeft="1rem"
                variant="h5"
                sx={{ fontWeight: "700", textAlign: "left" }}
                gutterBottom
              >
                Search
              </Typography>
              <Typography
                marginLeft="1rem"
                variant="body1"
                sx={{ textAlign: "left" }}
                gutterBottom
              >
                Make specific searches using our different filtering options.
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Box margin="5em" minHeight="100" />
    </Container>
  );
}
