import { Box, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Hero() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "15px",
        flexDirection: "column",
        backgroundColor: "primary.main",
        padding: "30px",
        borderRadius: "10px",
        color: "#f9f9f9",
      }}
    >
      <Typography variant="h2" sx={{ fontSize: { xs: "32px", md: "64px" } }}>
        Welcome to{" "}
        <Typography
          fontWeight={400}
          variant="h2"
          component={"span"}
          sx={{ fontSize: { xs: "32px", md: "unset" } }}
        >
          BATCHBOOK
        </Typography>
      </Typography>
      <Typography fontWeight={400} variant="h5" gutterBottom>
        Share your profile and check your batchmates' profiles
      </Typography>
      <Button
        sx={{
          backgroundColor: "#F9f9f9",
          color: "primary.main",
          "&:hover": { backgroundColor: "#f6f6f6" },
        }}
        to={"/register"}
        component={RouterLink}
        variant="contained"
      >
        Get Started
      </Button>
    </Box>
  );
}
