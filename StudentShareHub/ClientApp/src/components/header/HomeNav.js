import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SchoolIcon from "@mui/icons-material/School";
import Theme from "../../ui/Theme";
import { ThemeProvider } from "@mui/material/styles";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LogoutIcon from "@mui/icons-material/Logout";
import QuizIcon from "@mui/icons-material/Quiz";
import AddIcon from "@mui/icons-material/Add";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";

const settings = ["Profile", "Change password", "Logout"];
const upload = ["Book", "Video", "Quiz"];
function getLink(setting) {
  switch (setting) {
    case "Profile":
      return "/profile";
    case "Change password":
      return "/change-password";
    case "Logout":
      return "/logout";
    case "Book":
      return "/upload-book";
    case "Video":
      return "/upload-video";
    case "Quiz":
      return "/upload-quiz";
    default:
      return "/";
  }
}
function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (event) => {
    anchorElUser && setAnchorElUser(null);
    anchorEl && setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <ThemeProvider theme={Theme}>
      <AppBar position="fixed" color="navbar">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <SchoolIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/home"
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

            <Box
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            ></Box>
            <SchoolIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 600,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              StudentShareHub
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Upload material">
                <Button
                  style={{ margin: "8px" }}
                  aria-controls="menu"
                  aria-haspopup="true"
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleClick}
                >
                  Upload
                </Button>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbars"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleCloseUserMenu}
              >
                {upload.map((list) => (
                  <MenuItem
                    key={list}
                    onClick={handleCloseUserMenu}
                    component={Link}
                    to={getLink(list)}
                  >
                    <ListItemIcon sx={{ width: "30px" }}>
                      {list === "Book" && <LibraryBooksIcon />}
                      {list === "Video" && <YouTubeIcon />}
                      {list === "Quiz" && <QuizIcon />}
                    </ListItemIcon>
                    <Typography
                      textAlign="center"
                      sx={{ textDecoration: "none", color: "inherit" }}
                    >
                      {list}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={handleCloseUserMenu}
                    component={Link}
                    to={getLink(setting)}
                  >
                    <ListItemIcon>
                      {setting === "Profile" && <AccountCircleIcon />}
                      {setting === "Change password" && <VpnKeyIcon />}
                      {setting === "Logout" && <LogoutIcon />}
                    </ListItemIcon>
                    <Typography
                      textAlign="center"
                      sx={{ textDecoration: "none", color: "inherit" }}
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default ResponsiveAppBar;
