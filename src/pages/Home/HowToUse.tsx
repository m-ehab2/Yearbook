import { Box, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function HowToUse() {
  return (
    <Box sx={{ margin: "40px 0px" }}>
      <Typography variant="h4" gutterBottom color="primary">
        How to Use
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            marginBottom: "20px",
            width: "30%",
            backgroundColor: "#f3f3f3",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Step 1: Create an Account
          </Typography>
          <Typography variant="body1" gutterBottom>
            Register for a BATCHBOOK account using your email.
          </Typography>
        </Box>
        <Box
          sx={{
            marginBottom: "20px",
            width: "30%",
            backgroundColor: "#f3f3f3",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Step 2: Create Your Profile
          </Typography>
          <Typography variant="body1" gutterBottom>
            Add a picture and some extra details to showcase on your Card in the
            batch section.
          </Typography>
        </Box>
        <Box
          sx={{
            marginBottom: "20px",
            width: "30%",
            backgroundColor: "#f3f3f3",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Step 3: All Set
          </Typography>
          <Typography variant="body1" gutterBottom>
            Now all site viewers can view your Card and all the contact info you
            provided.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}
      >
        <Typography variant="body1" gutterBottom>
          Ready to get started? Click the button below to Register!
        </Typography>
        <Button
          to={"/register"}
          component={RouterLink}
          variant="contained"
          color="primary"
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}
