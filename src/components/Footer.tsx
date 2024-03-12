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
        padding: "30px 20px",
        textAlign: "center",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "center", md: "top" },
        justifyContent: "space-between",
        marginTop: "30px",
        gap: { xs: "20px", md: "10px" },
      }}
    >
      <Box
        sx={{
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "10px",
          color: "#f0f0f0",
          width: { xs: "100%", md: "50%" },
          marginBottom: { xs: "20px", sm: 0 },
        }}
      >
        <Box>
          <img src={whiteLogo} alt="" height="40px" />
        </Box>
        <Typography color={"#f0f0f0"}>
          Empowering ITI alumni and aspiring students alike, our website serves
          as a central hub for networking, information, and career opportunities
          in the field of technology.
        </Typography>
        <Box
          sx={{
            marginTop: "10px",
            display: "flex",
            gap: "20px",
            justifyContent: "center", // Center align social icons for smaller screens
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
          color: "#f0f0f0",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "20px",
          width: { xs: "100%", md: "25%" },
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
            gap: "20px",
            fontSize: "16px",
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
            to={"/posts"}
            color="inherit"
            underline="none"
            sx={{ marginRight: 2, fontFamily: "Roboto" }}
          >
            Posts
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
          color: "#f0f0f0",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "20px",
          width: { xs: "100%", md: "25%" },
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
            fontSize: "16px",
            marginLeft: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <EmailIcon />
            <Typography>muhamedehab1@gmail.com</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <LocalPhoneIcon />
            <Typography>(+20) 12 345 7890</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <PlaceIcon />
            <Typography>123 Tech Street, City, Country</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
