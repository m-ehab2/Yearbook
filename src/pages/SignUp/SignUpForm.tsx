import React from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../../firebaseConfig";
import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore } from "firebase/firestore";

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

const SignUpForm: React.FC = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    batch: "s",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, `Must be more than 2 letters`)
      .required("Required"),
    lastName: Yup.string()
      .min(3, `Must be more than 2 letters`)
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/,
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    batch: Yup.string().matches(/(MEARN2024)/, "Select A Batch"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Form submitted with values:", values);
    try {
      const { email, password, firstName, lastName, batch } = values;
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up successfully!", user);
      const docRef = await addDoc(collection(db, "users"), {
        firstName,
        lastName,
        batch,
        email,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error: unknown) {
      console.error("Error signing up:", error.message);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
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
        Register for An account
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ width: "45%" }}>
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            {...formik.getFieldProps("firstName")}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          />
          <Typography sx={{ height: "16px" }} variant="body2" color="error">
            {formik.touched.firstName && formik.errors.firstName}
          </Typography>
        </Box>
        <Box sx={{ width: "45%" }}>
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            {...formik.getFieldProps("lastName")}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          />
          <Typography sx={{ height: "16px" }} variant="body2" color="error">
            {formik.touched.lastName && formik.errors.lastName}
          </Typography>
        </Box>
      </Box>
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
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        {...formik.getFieldProps("batch")}
        fullWidth
        error={formik.touched.batch && Boolean(formik.errors.batch)}
      >
        <MenuItem value="s">Select A Batch</MenuItem>
        <MenuItem value="MEARN2024">Mearn 2024</MenuItem>
      </Select>
      <Typography sx={{ height: "32px" }} variant="body2" color="error">
        {formik.touched.batch && formik.errors.batch}
      </Typography>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUpForm;
