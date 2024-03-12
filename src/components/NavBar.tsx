import * as React from "react";
import { AppBar, Box, Toolbar, Container, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import whiteLogo from "../assets/horizontalLogoWhite.png";
import whiteLogoSmall from "../assets/whiteLogo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import MenuIcon from "@mui/icons-material/Menu";

function NavBar() {
  const auth = getAuth();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <img src={whiteLogo} alt="" height="40px" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={() => handleClick("home")}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleClick("posts")}>
                <Typography textAlign="center">Posts</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleClick("MEARN 2024")}>
                <Typography textAlign="center">MEARN 2024</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleClick("about")}>
                <Typography textAlign="center">About</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleClick("contact")}>
                <Typography textAlign="center">Contact</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              justifyContent: "center",
              flexGrow: { xs: "1", md: "unset" },
            }}
          >
            <img src={whiteLogoSmall} alt="" height="40px" />
          </Box>
          <Box
            sx={{
              flexGrow: { xs: "unset", md: "1" },
              display: { xs: "none", md: "flex", justifyContent: "center" },
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
              sx={location.pathname === "/posts" ? activeStatus : normalStatus}
              onClick={() => handleClick("posts")}
            >
              POSTS
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

{
  /* <AppBar
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
          sx={location.pathname === "/posts" ? activeStatus : normalStatus}
          onClick={() => handleClick("posts")}
        >
          POSTS
        </Button>
        <Button
          sx={location.pathname === "/mearn2024" ? activeStatus : normalStatus}
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
          sx={location.pathname === "/contact" ? activeStatus : normalStatus}
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
</AppBar>; */
}
