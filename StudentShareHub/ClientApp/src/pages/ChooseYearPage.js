import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Stack,
  Paper,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { styled } from "@mui/material/styles";

import { Link } from "react-router-dom";

import Department from "../assets/Department.jpg";
import Footer from "../components/footer/Footer";
import NavBar from "../components/body/NavBar";

function ChooseDepartmentPage() {
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: "center",
    hover: {
      backgroundColor: "lightblue",
      cursor: "pointer",
    },
  }));

  const [selected, setSelected] = useState(null);

  const handleClick = (index) => {
    setSelected(index);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavBar />
      <Container maxWidth="100%">
        <Box sx={{ height: "100vh", display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
            <img
              src={Department}
              alt="Department"
              style={{ width: "50%", objectFit: "scale-down" }}
            />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Choose your Year
              </Typography>
              <Typography variant="body1" paragraph>
                Choose the year you are interested in.
              </Typography>
              <Stack
                spacing={2}
                sx={{ width: "40%", margin: "auto", textAlign: "center" }}
              >
                <Item
                  onClick={() => handleClick(0)}
                  sx={{
                    color: selected === 0 ? "#fff" : "inherit",
                    backgroundColor: selected === 0 ? "#2b6cb0" : "inherit",
                  }}
                >
                  Year 1
                </Item>
                <Item
                  onClick={() => handleClick(1)}
                  sx={{
                    color: selected === 1 ? "#fff" : "inherit",
                    backgroundColor: selected === 1 ? "#2b6cb0" : "inherit",
                  }}
                >
                  Year 2
                </Item>
                <Item
                  onClick={() => handleClick(2)}
                  sx={{
                    color: selected === 2 ? "#fff" : "inherit",
                    backgroundColor: selected === 2 ? "#2b6cb0" : "inherit",
                  }}
                >
                  Year 3
                </Item>
                <Item
                  onClick={() => handleClick(3)}
                  sx={{
                    color: selected === 3 ? "#fff" : "inherit",
                    backgroundColor: selected === 3 ? "#2b6cb0" : "inherit",
                  }}
                >
                  Year 4
                </Item>
              </Stack>
              <Box
                sx={{
                  textAlign: { xs: "center", md: "right", marginRight: "5rem" },
                }}
              >
                <Button
                  endIcon={<ArrowForwardIosIcon />}
                  sx={{ margin: { xs: "1rem 0", md: "2.5rem 0 2.5rem 0" } }}
                  variant="contained"
                  color="primary"
                  size="large"
                  component={Link}
                  to="/home"
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default ChooseDepartmentPage;
