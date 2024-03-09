import * as React from "react";
import { AppBar, Box, Toolbar, Container, Button } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import whiteLogo from "../assets/horizontalLogoWhite.png";
import { useNavigate } from "react-router-dom";
import useAuthPersistence from "../hooks/Auth";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
const pages = ["Home", "MEARN 2024", "About", "Contact"];
const settings = ["Profile", "Logout"];
function NavBar() {
  const auth = getAuth();
  const { sessionToken, clearAuthCookie } = useAuthPersistence();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();

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
    if (option === "Profile") {
      navigate("/myprofile");
    } else if (option === "Logout") {
      try {
        await toast.promise(signOut(auth), {
          pending: "Logging Out",
          success: "Logout Successful",
          error: "Logout Failed",
        });
        clearAuthCookie();
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
      sx={{ padding: "0px 128px", marginBottom: "10px" }}
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
            {pages.map((page) => (
              <Button
                sx={{
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#f9f9f9",
                    color: "primary.main",
                  },
                }}
                key={page}
                onClick={() => handleClick(page)}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {auth.currentUser ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={auth.currentUser?.displayName}
                      src="/static/images/avatar/2.jpg"
                    />
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
                      onClick={() => handleCloseUserMenu(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Button
                sx={{
                  backgroundColor: "#fff",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "#f9f9f9",
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
