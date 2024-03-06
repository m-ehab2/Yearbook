import { Box, Grid } from "@mui/material";
import React from "react";
import RightPanel from "./RightPanel";
import SignUpForm from "./SignUpForm";

export default function SignUp() {
  return (
    <Box
      component="section"
      sx={{
        height: "95vh",
        p: 2,
        px: 10,
        background: "",
      }}
    >
      <Grid
        container
        sx={{ border: "1px dashed grey", height: "100%", borderRadius: "10px" }}
      >
        <Grid item xs={6}>
          <SignUpForm />
        </Grid>
        <Grid item xs={6} sx={{ background: "#437dff", borderRadius: "10px" }}>
          <RightPanel></RightPanel>
        </Grid>
      </Grid>
    </Box>
  );
}
