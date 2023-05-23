import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LandingNav from "../header/LandingNav";
import LoginImg from "../../assets/LoginImg.jpg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Loading from "../body/Loading";
import GenericAlert from "../body/GenericAlert";
import { Link as RouterLink } from "react-router-dom";

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

export default function SignInSide() {
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
const [error, setError] = useState(null); // Error state for the form
  const registerSuccess = useSelector((state) => state.auth.registerSuccess);
 


  useEffect(() => {
    if (registerSuccess) {
      setShowAlert(true);

      // Hide the alert after 5 seconds
      const timeout = setTimeout(() => {
        setShowAlert(false);
      }, 20000);

      // Clear the timeout when the component unmounts
      return () => clearTimeout(timeout);
    }
  }, [registerSuccess]);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setError(null); // Reset the error state
    setIsLoading(true);

    await new Promise((resolve, reject) => {
      dispatch({
        type: "LOGIN_REQUEST",
        payload: {
          username: data.get("email"),
          password: data.get("password"),
        },
        callback: () => {
          setIsLoading(false); // Stop loading
          resolve(); // Resolve the Promise to continue with the code after the dispatch
          navigate("/choose-department");
        },
        errorCallback: (error) => {
          setError(error.message); // Set the error
          setIsLoading(false); // Stop loading
        },
      });
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {showAlert&& (
          <GenericAlert severity="success" message="You have successfully registered" position={{ bottom: '20px', left: '20px' }} />
        )}
      {isLoading && <Loading />}
      <LandingNav />
     
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${LoginImg})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 18,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            

            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {error != null && (
              <Alert severity="error">
                <AlertTitle>
                  <strong>Error</strong>{" "}
                </AlertTitle>
                {error}
                
              </Alert>
            )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to='/Signup' variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
