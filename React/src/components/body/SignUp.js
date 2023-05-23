import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LandingNav from "../header/LandingNav";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setError } from "../../store/auth-slice";
import { useState } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [error, setError] = useState(null); // Error state for the form
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
  
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setError(null); // Reset the error state
    setIsLoading(true);
    await new Promise((resolve, reject) => {
      dispatch({
        type: "REGISTER_REQUEST",
        payload: {
          firstname: data.get("firstName"),
          lastname: data.get("lastName"),
          email: data.get("email"),
          password: data.get("password"),
        },
        callback: () => {
          setIsLoading(false); // Stop loading
          resolve(); // Resolve the Promise to continue with the code after the dispatch
          navigate("/signin");
        },
        errorCallback: (error) => {
          
          setIsLoading(false); // Stop loading
          setError(error.message); // Set the error
        
        },
      });
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <LandingNav />
      {isLoading && <Loading />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 18,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
           {error != null && (
              <Alert severity="error">
                <AlertTitle>
                  <strong>Error</strong>{" "}
                </AlertTitle>
                {error}
              </Alert>
            )}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>


          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
          
            <Grid container spacing={2}>
           
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
             
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
            >
              Sign Up
            </Button> 
            </Box>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
   
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
