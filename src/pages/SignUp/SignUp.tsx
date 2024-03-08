import { Box, Grid } from "@mui/material";
import React from "react";
import RightPanel from "./RightPanel";
import SignUpForm from "./SignUpForm";

export default function SignUp() {
  return (
    <Box
      component="section"
      sx={{
        height: "100vh",
        background: "",
      }}
    >
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={6}>
          <SignUpForm />
        </Grid>
        <Grid item xs={6} sx={{ background: "#437dff" }}>
          <RightPanel></RightPanel>
        </Grid>
      </Grid>
    </Box>
  );
}
