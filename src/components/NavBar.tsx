import * as React from "react";
import { AppBar, Box, Toolbar, Container, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import whiteLogo from "../assets/horizontalLogoWhite.png";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
function NavBar() {
  const auth = getAuth();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();
  const location = useLocation();
  const normalStatus = {
    color: "white",
    "&:hover": {
      backgroundColor: "#f9f9f9",
      color: "primary.main",
    },
  };
  const activeStatus = {
    backgroundColor: "#f9f9f9",
    color: "primary.main",
    "&:hover": { backgroundColor: "#f9f9f9", color: "primary.main" },
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClick = (e: string) => {
    if (e === "MEARN 2024") {
      navigate("/mearn2024");
    } else {
      navigate(`/${e}`);
    }
  };

  const handleCloseUserMenu = async (option: string) => {
    setAnchorElUser(null);
    if (option === "profile") {
      navigate("/myprofile");
    } else if (option === "logout") {
      try {
        await toast.promise(signOut(auth), {
          pending: "Logging Out",
          success: "Logout Successful",
          error: "Logout Failed",
        });
        navigate("/home");
      } catch (err: unknown) {
        toast.error("Server Error, please try again later");
      }
    }
  };

  return (
    <AppBar
      position="static"
      color="primary"
      sx={{ padding: "0px 128px", marginBottom: "30px" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={whiteLogo} alt="" height="40px" />
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              gap: "30px",
            }}
          >
            <Button
              sx={
                location.pathname === "/home" || location.pathname === "/"
                  ? activeStatus
                  : normalStatus
              }
              onClick={() => handleClick("home")}
            >
              HOME
            </Button>
            <Button
              sx={
                location.pathname === "/mearn2024" ? activeStatus : normalStatus
              }
              onClick={() => handleClick("MEARN 2024")}
            >
              MEARN 2024
            </Button>
            <Button
              sx={location.pathname === "/about" ? activeStatus : normalStatus}
              onClick={() => handleClick("about")}
            >
              about
            </Button>
            <Button
              sx={
                location.pathname === "/contact" ? activeStatus : normalStatus
              }
              onClick={() => handleClick("contact")}
            >
              Contact
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {auth.currentUser ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar src="/static/images/avatar/2.jpg" />
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
                  <MenuItem onClick={() => handleCloseUserMenu("profile")}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => handleCloseUserMenu("logout")}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                sx={{
                  backgroundColor: "#f9f9f9",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
                onClick={() => handleClick("login")}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
