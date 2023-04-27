import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SchoolIcon from "@mui/icons-material/School";
import Theme from "../../ui/Theme";
import { ThemeProvider } from "@mui/material/styles";
import {Link } from 'react-router-dom';


import LoginIcon from '@mui/icons-material/Login';
import CreateIcon from '@mui/icons-material/Create';



function ResponsiveAppBar() {
  
  return (
    <ThemeProvider theme={Theme}>
      <AppBar position="fixed" color="navbar">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <SchoolIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              StudentShareHub
            </Typography>

            <SchoolIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              StudentShareHub
            </Typography>

            <Box sx={{ flexGrow: 0  }}>
              <Button
                color="neutral"
                variant="contained"
                endIcon={<LoginIcon />}
                component={Link}
                to="/signin"
                sx={{ marginRight: '.5rem' }}
              >
                SIGN IN
              </Button>
              <Button
                color="primary"
                variant="contained"
                endIcon={<CreateIcon />}
                component={Link}
                to="/signup"
                
              >
                Sign Up
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default ResponsiveAppBar;
