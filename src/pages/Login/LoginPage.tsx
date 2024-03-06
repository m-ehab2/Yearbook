import React from "react";
import Grid from "@mui/material/Grid";
import LeftSideLogin from "./LeftSideLogin";

export default function LoginPage() {
  return (
    <Grid container spacing={2} sx={{ bgcolor: "blueviolet" }}>
      <LeftSideLogin />
      <Grid item xs={6}></Grid>
    </Grid>
  );
}
