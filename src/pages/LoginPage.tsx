import React from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import {} from "@mui/material/";
export default function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          type="submit"
        >
          Login
        </Button>
      </form>
    </Container>
  );
}
