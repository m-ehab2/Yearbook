import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default function RightPanel() {
  return (
    <Box
      sx={{
        p: 3,
        py: 20,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography variant="h3" gutterBottom color={"whitesmoke"}>
        Get Your Profile Out There
      </Typography>
    </Box>
  );
}
