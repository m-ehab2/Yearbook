import React from "react";
import Grid from "@mui/material/Grid";
import LoginForm from "./LoginForm";
import RightPanel from "../SignUp/RightPanel";
import { Box } from "@mui/material";

export default function LoginPage() {
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
          <LoginForm />
        </Grid>
        <Grid item xs={6} sx={{ background: "#437dff" }}>
          <RightPanel></RightPanel>
        </Grid>
      </Grid>
    </Box>
  );
}
