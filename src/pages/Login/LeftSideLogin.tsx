import React from "react";
import { Typography, TextField, Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Logo from "../../assets/horizontallogo.png";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

export default function LeftSideLogin() {
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
    <Grid item xs={6}>
      <img src={Logo} alt="Logo" />
      <Typography variant="h4" align="center" gutterBottom>
        Login{" "}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          size="large"
          type="submit"
        >
          Login
        </Button>
      </form>
    </Grid>
  );
}
