import {
  Typography,
  TextField,
  Button,
  Box,
  Link,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
export default function LoginForm() {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/,
        "Invalid Password"
      ),
  });
  const auth = getAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await toast.promise(
          signInWithEmailAndPassword(auth, values.email, values.password),
          {
            pending: "Login is pending",
            success: "Login Successful",
            error: "Login Failed",
          }
        );
        navigate("/myprofile");
      } catch (error) {
        const errorMessage = (error as Error).message;
        if (errorMessage.includes("auth/invalid-credential")) {
          toast.error("Invalid Credentials");
        } else {
          toast.error("An unexpected error occurred. Please try again later.");
        }
      }
    },
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

      <Box sx={{ margin: "20px 0" }}>
        <FormControl sx={{ width: "100%" }} variant="outlined">
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
        <Typography sx={{ height: "16px" }} variant="body2" color="error">
          {formik.touched.password && formik.errors.password}
        </Typography>
        {/* <Typography sx={{ marginBottom: "10px", textAlign: "right" }}>
          Forgot your Password?
          <Link
            component={RouterLink}
            to={"/register"}
            color="primary"
            underline="none"
            sx={{ marginLeft: 1, fontFamily: "Roboto" }}
          >
            Reset Your Password
          </Link>
        </Typography> */}
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginBottom: "10px" }}
      >
        Log In
      </Button>
      <Typography sx={{ textAlign: "center", marginTop: "15px" }}>
        Don't have an account yet?
        <Link
          component={RouterLink}
          to={"/register"}
          color="primary"
          underline="none"
          sx={{ marginLeft: 1, fontFamily: "Roboto", fontWeight: "600" }}
        >
          Register
        </Link>
      </Typography>
    </Box>
  );
}
