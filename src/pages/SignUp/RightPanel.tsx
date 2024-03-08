import React from "react";
import { Box, Typography } from "@mui/material";
import hands from "../../assets/hands.png";
import whiteLogo from "../../assets/horizontalLogoWhite.png";
export default function RightPanel() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "top",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        position: "relative",
      }}
    >
      <Box sx={{ width: "70%", marginTop: "20%" }}>
        <img src={whiteLogo} alt="Patchbook Logo" width="100%" />
      </Box>
      <Typography
        variant="h4"
        gutterBottom
        color={"white"}
        align="center"
        fontFamily="Arial, sans-serif"
        sx={{ width: "70%" }}
      >
        Unlocking Potential, Uniting ITI Alumni.
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "60%",
          overflow: "hidden",
          position: "absolute",
          bottom: "0",
        }}
      >
        <img
          src={hands}
          alt="Hands Picture"
          width="100%"
          style={{ position: "absolute", bottom: "0" }}
        />
      </Box>
    </Box>
  );
}
