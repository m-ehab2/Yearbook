import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

export default function Contact() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;
    const mailtoUri = `mailto:muhamedehab1@gmail.com?subject=Contact Message from ${name}&body=${message}`;
    window.location.href = mailtoUri;
  };

  return (
    <Box sx={{ padding: { xs: "20px", md: "20px 128px" } }}>
      <Typography variant="h4" gutterBottom color="primary">
        Contact Us
      </Typography>
      <Typography variant="body1">
        Have questions or feedback? Send us a message using the form below.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mt: 2 }}>
          <TextField
            name="name"
            label="Your Name"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            name="email"
            label="Your Email"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            name="message"
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Send Message
          </Button>
        </Box>
      </form>
    </Box>
  );
}
