import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function SignUpForm() {
  const auth = getAuth();
  const db = getFirestore();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    batch: "s",
    agreedToTerms: false,
  };
  const navigate = useNavigate();
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
    agreedToTerms: Yup.boolean().oneOf(
      [true],
      "You must agree to the terms and conditions"
    ),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const { email, password, firstName, lastName, batch } = values;
      const user = await toast.promise(
        createUserWithEmailAndPassword(auth, email, password),
        {
          pending: "Registration is pending",
          success: "Registration Successful",
          error: "Registration Failed",
        }
      );
      await addDoc(collection(db, "users"), {
        firstName,
        lastName,
        batch,
        email,
        uid: user.user.uid,
        xLink: "",
        linkedInLink: "",
        gitHubLink: "",
        motto: "",
        title: "",
      });
      navigate("/myprofile");
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes("auth/email-already-in-use")) {
        toast.error("Email Already Registered");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
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
          margin="normal"
          fullWidth
          {...formik.getFieldProps("email")}
          error={formik.touched.email && Boolean(formik.errors.email)}
        />
        <Typography sx={{ height: "16px" }} variant="body2" color="error">
          {formik.touched.email && formik.errors.email}
        </Typography>
      </Box>
      <Box>
        <FormControl margin="normal" sx={{ width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            {...formik.getFieldProps("password")}
            error={formik.touched.password && Boolean(formik.errors.password)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Typography sx={{ height: "48px" }} variant="body2" color="error">
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
      <Typography sx={{ height: "16px" }} variant="body2" color="error">
        {formik.touched.batch && formik.errors.batch}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Checkbox {...formik.getFieldProps("agreedToTerms")} color="primary" />
        <Typography variant="body2">
          I agree to the <a href="/terms">terms and conditions</a>
        </Typography>
      </Box>
      <Typography sx={{ height: "32px" }} variant="body2" color="error">
        {formik.touched.agreedToTerms && formik.errors.agreedToTerms}
      </Typography>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginBottom: "10px" }}
      >
        Sign Up
      </Button>
      <Typography>
        Already Have an account?
        <Link
          component={RouterLink}
          to={"/login"}
          color="primary"
          underline="none"
          sx={{ marginLeft: 1, fontFamily: "Roboto" }}
        >
          Login
        </Link>
      </Typography>
    </Box>
  );
}
