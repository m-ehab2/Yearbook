import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

interface UserProfile {
  firstName: string;
  lastName: string;
  uid?: string;
  title?: string;
  phone?: string;
  currentCompany?: string;
  motto?: string;
  gitHubLink?: string;
  linkedInLink?: string;
  xLink?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface LeftSideFormProps {
  profile: UserProfile | null;
  handleSubmit: (arg0: UserProfile) => void;
  reference: string;
}
export default function LeftSideForm({
  profile,
  handleSubmit,
  reference,
}: LeftSideFormProps) {
  const [saving, setSaving] = useState<boolean>(false);
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required")
      .min(3, "First name is too short"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(3, "Last name is too short"),
    title: Yup.string()
      .required("A professional title is required")
      .min(3, "Your title is too short"),
    motto: Yup.string()
      .required("Motto is required")
      .min(3, "You can do better than that, make it longer"),
    phone: Yup.string()
      .length(10, "Please Enter a valid egyptian number")
      .matches(/^\d+$/, "Please Enter a valid egyptian number"),
    currentCompany: Yup.string().min(3, "No Comapny Name is this short!"),
    gitHubLink: Yup.string().url("Invalid GitHub link"),
    linkedInLink: Yup.string().url("Invalid LinkedIn link"),
    xLink: Yup.string().url("Invalid X link"),
  });
  const initialValues = {
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    title: profile?.title || "My Professional Title",
    motto: profile?.motto || "My Favorite Saying",
    phone: profile?.phone || "",
    currentCompany: profile?.currentCompany || "",
    gitHubLink: profile?.gitHubLink || "",
    linkedInLink: profile?.linkedInLink || "",
    xLink: profile?.xLink || "",
  };

  const handleSubmite = async (values: UserProfile) => {
    setSaving(true);
    const db = getFirestore();
    const userDocRef = doc(db, "users", reference);
    await updateDoc(userDocRef, values);
    handleSubmit(values);
    setSaving(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmite,
  });

  return (
    <Box sx={{ p: 2 }}>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ width: "47%" }}>
            <TextField
              fullWidth
              margin="normal"
              label="First Name"
              {...formik.getFieldProps("firstName")}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
            />
            <Typography sx={{ height: "16px" }} variant="body2" color="error">
              {formik.touched.firstName && formik.errors.firstName}
            </Typography>
          </Box>
          <Box sx={{ width: "47%" }}>
            <TextField
              fullWidth
              margin="normal"
              label="Last Name"
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
            fullWidth
            margin="normal"
            label="Title"
            {...formik.getFieldProps("title")}
            error={formik.touched.title && Boolean(formik.errors.title)}
          />
          <Typography sx={{ height: "16px" }} variant="body2" color="error">
            {formik.touched.title && formik.errors.title}
          </Typography>
        </Box>
        <Box>
          <TextField
            fullWidth
            margin="normal"
            label="Motto"
            {...formik.getFieldProps("motto")}
            error={formik.touched.motto && Boolean(formik.errors.motto)}
          />
          <Typography sx={{ height: "16px" }} variant="body2" color="error">
            {formik.touched.motto && formik.errors.motto}
          </Typography>
        </Box>
        <Box>
          <TextField
            fullWidth
            margin="normal"
            label="Current Company"
            {...formik.getFieldProps("currentCompany")}
            error={
              formik.touched.currentCompany &&
              Boolean(formik.errors.currentCompany)
            }
          />
          <Typography sx={{ height: "16px" }} variant="body2" color="error">
            {formik.touched.currentCompany && formik.errors.currentCompany}
          </Typography>
        </Box>
        <Box>
          <TextField
            label="Phone Number"
            id="outlined-start-adornment"
            fullWidth
            {...formik.getFieldProps("phone")}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+20</InputAdornment>
              ),
            }}
          />
          <Typography sx={{ height: "16px" }} variant="body2" color="error">
            {formik.touched.phone && formik.errors.phone}
          </Typography>
        </Box>
        <Box>
          <TextField
            fullWidth
            margin="normal"
            label="Github Link"
            {...formik.getFieldProps("gitHubLink")}
            error={
              formik.touched.gitHubLink && Boolean(formik.errors.gitHubLink)
            }
          />
          <Typography sx={{ height: "16px" }} variant="body2" color="error">
            {formik.touched.gitHubLink && formik.errors.gitHubLink}
          </Typography>
        </Box>
        <Box>
          <TextField
            fullWidth
            margin="normal"
            label="LinkedIn Link"
            {...formik.getFieldProps("linkedInLink")}
            error={
              formik.touched.linkedInLink && Boolean(formik.errors.linkedInLink)
            }
          />
          <Typography sx={{ height: "16px" }} variant="body2" color="error">
            {formik.touched.linkedInLink && formik.errors.linkedInLink}
          </Typography>
        </Box>
        <Box>
          <TextField
            fullWidth
            margin="normal"
            label="X (formerly Twitter) Link"
            {...formik.getFieldProps("xLink")}
            error={formik.touched.xLink && Boolean(formik.errors.xLink)}
          />
          <Typography sx={{ height: "16px" }} variant="body2" color="error">
            {formik.touched.xLink && formik.errors.xLink}
          </Typography>
        </Box>
        <Button variant="contained" type="submit" disabled={saving}>
          {saving ? "updating..." : "Update Info"}
        </Button>
      </form>
    </Box>
  );
}
