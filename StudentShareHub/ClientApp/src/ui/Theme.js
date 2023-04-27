import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#2b6cb0",
      contrastText: "#fff",
    },
    navbar: {
      main: "#fff",
      contrastText: "#2b6cb0",
    },

    neutral: {
      main: "#fff",
      contrastText: "#000",
    },
  },
});

export default Theme;
