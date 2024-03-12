import { Box, Grid } from "@mui/material";
import RightPanel from "./RightPanel";
import SignUpForm from "./SignUpForm";

export default function SignUp() {
  return (
    <Box
      component="section"
      sx={{
        height: "100vh",
        width: "100%",
      }}
    >
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={12} md={6} sx={{ padding: "10px" }}>
          <SignUpForm />
        </Grid>
        <Grid item xs={12} md={6} sx={{ background: "#437dff" }}>
          <RightPanel></RightPanel>
        </Grid>
      </Grid>
    </Box>
  );
}
