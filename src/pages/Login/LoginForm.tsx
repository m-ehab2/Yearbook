import React from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

export default function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        width: "70%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        color="primary"
        sx={{ fontWeight: "bold" }}
      >
        Login to your account
      </Typography>
      <Box>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("email")}
          error={formik.touched.email && Boolean(formik.errors.email)}
        />
        <Typography sx={{ height: "16px" }} variant="body2" color="error">
          {formik.touched.email && formik.errors.email}
        </Typography>
      </Box>
      <Box sx={{ marginBottom: "10px" }}>
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("password")}
          error={formik.touched.password && Boolean(formik.errors.password)}
        />
        <Typography sx={{ height: "32px" }} variant="body2" color="error">
          {formik.touched.password && formik.errors.password}
        </Typography>
      </Box>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Log In
      </Button>
    </Box>
  );
}
