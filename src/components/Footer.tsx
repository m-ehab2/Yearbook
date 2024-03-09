import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import whiteLogo from "../assets/horizontalLogoWhite.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PlaceIcon from "@mui/icons-material/Place";
export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "#000",
        padding: "20px 128px",
        textAlign: "center",
        display: "flex",
        alignItems: "top",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "10px",
          color: "white",
          width: "50%",
        }}
      >
        <Box>
          <img src={whiteLogo} alt="" height="40px" />
        </Box>
        <Typography color={"white"}>
          Empowering ITI alumni and aspiring students alike, our website serves
          as a central hub for networking, information, and career opportunities
          in the field of technology.
        </Typography>
        <Box
          sx={{
            marginTop: "10px",
            display: "flex",
            gap: "20px",
          }}
        >
          <a href="https://github.com/m-ehab2/Yearbook">
            <GitHubIcon sx={{ scale: "1.3" }} />
          </a>
          <a href="https://www.linkedin.com/in/muhamed-ehab-9624852a4/">
            <LinkedInIcon sx={{ scale: "1.3" }} />
          </a>
          <a href="https://twitter.com/crappyrat">
            <XIcon sx={{ scale: "1.3" }} />
          </a>
        </Box>
      </Box>

      <Box
        sx={{
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "20px",
        }}
      >
        <Typography fontWeight={700} variant="h5">
          Navigation
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "10px",
            fontSize: "20px",
            marginLeft: "10px",
          }}
        >
          <Link
            component={RouterLink}
            to={"/"}
            color="inherit"
            underline="none"
            sx={{ marginRight: 2, fontFamily: "Roboto" }}
          >
            Home
          </Link>
          <Link
            component={RouterLink}
            to={"/mearn2024"}
            color="inherit"
            underline="none"
            sx={{ marginRight: 2, fontFamily: "Roboto" }}
          >
            Mearn 2024
          </Link>
          <Link
            component={RouterLink}
            to={"/about"}
            color="inherit"
            underline="none"
            sx={{ marginRight: 2, fontFamily: "Roboto" }}
          >
            About
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "20px",
        }}
      >
        <Typography fontWeight={700} variant="h5">
          Contact
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "10px",
            fontSize: "20px",
            marginLeft: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              fontSize: "20px",
              alignItems: "center",
            }}
          >
            <EmailIcon />
            <Typography fontSize={"20px"}>muhamedehab1@gmail.com</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              fontSize: "20px",
              alignItems: "center",
            }}
          >
            <LocalPhoneIcon />
            <Typography fontSize={"20px"}>(+20) 12 345 7890</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              fontSize: "20px",
              alignItems: "center",
            }}
          >
            <PlaceIcon />
            <Typography fontSize={"20px"}>
              123 Tech Street, City, Country
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
