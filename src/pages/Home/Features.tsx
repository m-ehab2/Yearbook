import { Box, Typography } from "@mui/material";

export default function Features() {
  return (
    <Box sx={{ margin: "40px 0px" }}>
      <Typography variant="h4" gutterBottom color="primary">
        Key Features
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#f3f3f3",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            width: "30%",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Browse Batch Profiles
          </Typography>
          <Typography variant="body1">
            Explore profiles of other members from your batch. Get to know their
            achievements, interests, and connections.
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#f3f3f3",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            width: "30%",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Create Profile
          </Typography>
          <Typography variant="body1">
            Create your own profile to showcase your skills, experiences, and
            aspirations. Share your unique story with your batchmates.
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#f3f3f3",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            width: "30%",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Profile
          </Typography>
          <Typography variant="body1">
            Update your profile at any time to reflect your latest achievements,
            interests, and connections. Keep your batchmates informed about your
            progress.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
