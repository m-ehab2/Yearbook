import { Box, Typography, Link, IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Link as RouterLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
interface UserProfile {
  firstName: string;
  lastName: string;
  uid: string;
  title?: string;
  motto?: string;
  gitHubLink?: string;
  linkedInLink?: string;
  xLink?: string;
  profilePic?: string;
}

interface cardProps {
  profile: UserProfile | null;
}

export default function ProfileCard({ profile }: cardProps) {
  const auth = getAuth();
  const location = useLocation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0px 6px 7px 1px rgba(0,0,0,0.3)",
        padding: "10px",
        borderRadius: "10px",
        borderColor: "primary.main",
        borderWidth: "1px",
        borderStyle: "solid",
        position: "relative",
        width: "300px",
        height: "350px",
      }}
    >
      {profile && profile?.uid === auth.currentUser?.uid ? (
        location.pathname === "/mearn2024" ? (
          <IconButton
            component={RouterLink}
            to={"/myprofile"}
            sx={{ position: "absolute", top: "10px", right: "10px" }}
            color="primary"
          >
            <EditIcon />
          </IconButton>
        ) : null
      ) : null}
      <Avatar
        sx={{ height: "200px", width: "200px" }}
        src={profile?.profilePic || ""}
        alt={profile?.firstName || "John Doe"}
      ></Avatar>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "10px",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" fontWeight={"500"}>
          {profile?.firstName} {profile?.lastName}
        </Typography>
        <Typography color={"GrayText"}>{profile?.title}</Typography>
      </Box>
      <Typography
        component="blockquote"
        sx={{
          fontStyle: "italic",
          fontWeight: "300",
          textAlign: "center",
          flexGrow: "1",
        }}
      >
        " {profile?.motto} "
      </Typography>
      <Box
        sx={{
          width: "90%",
          borderBottom: "2px solid",
          borderColor: "primary.main",
          marginBottom: "10px",
        }}
      ></Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-around", width: "100%" }}
      >
        {profile?.gitHubLink === "" ? null : (
          <a href={profile?.gitHubLink}>
            <GitHubIcon sx={{ scale: "1.3", color: "primary.main" }} />
          </a>
        )}
        {profile?.linkedInLink === "" ? null : (
          <a href={profile?.linkedInLink}>
            <LinkedInIcon sx={{ scale: "1.3", color: "primary.main" }} />
          </a>
        )}
        {profile?.xLink === "" ? null : (
          <a href={profile?.xLink}>
            <XIcon sx={{ scale: "1.3", color: "primary.main" }} />
          </a>
        )}
        {profile?.uid === "" ? null : (
          <Link component={RouterLink} to={`/profile/${profile?.uid}`}>
            <AccountBoxIcon sx={{ scale: "1.3", color: "primary.main" }} />
          </Link>
        )}
      </Box>
    </Box>
  );
}
