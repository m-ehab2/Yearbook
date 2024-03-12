import { Box, Button, Input, TextField, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useFormik } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import * as Yup from "yup";
import PostItem from "../../components/PostItem";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
interface UserProfile {
  firstName: string;
  lastName: string;
  uid: string;
  title?: string;
  phone?: string;
  motto?: string;
  gitHubLink?: string;
  linkedInLink?: string;
  xLink?: string;
  profilePic?: string;
}
export default function CreatePost() {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [userData, setUserData] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    uid: "",
    phone: "",
    title: "",
    motto: "",
    gitHubLink: "",
    linkedInLink: "",
    xLink: "",
    profilePic: "",
  });
  const auth = getAuth();
  useEffect(() => {
    const fetchUserData = async () => {
      const id = auth.currentUser?.uid;
      try {
        if (id) {
          const db = getFirestore();
          const usersRef = collection(db, "users");
          const userQuery = query(usersRef, where("uid", "==", id));

          try {
            const snapshot = await getDocs(userQuery);
            snapshot.forEach((doc) => {
              setUserData(doc.data() as UserProfile);
            });
          } catch (error) {
            console.error("Error getting user profile:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  const initialValues = {
    Title: "This Is A Sample Title",
    Text: "This is some sample text that fits the overall them of sample texts. You might have thought that lorem ipsum is a better alternative. But why would i use lorem when i can just write some words arranged in a certain way to look like some mildly important text. Cheers",
    Pic: "",
  };
  const validationSchema = Yup.object().shape({
    Title: Yup.string()
      .min(10, `Title Must be more than 10 Characters`)
      .required("Required"),
    Text: Yup.string()
      .min(100, `Post Content Must be more than 100 Characters`)
      .required("Required"),
  });
  const navigate = useNavigate();
  const handleSubmit = async (values: typeof initialValues) => {
    if (!file) {
      toast.error("Please Attach a Picture to your post");
    } else {
      try {
        setUploading(true);
        const storage = getStorage();
        const storageRef = ref(storage, `post_pics/${Date.now()}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        const db = getFirestore();
        await addDoc(collection(db, "posts"), {
          title: values.Title,
          text: values.Text,
          userName: userData && userData.firstName + " " + userData.lastName,
          uid: auth.currentUser?.uid,
          picUrl: downloadURL,
        });
        toast.success("Post Created Successfully");
        setUploading(false);
        navigate("/posts");
      } catch (error) {
        toast.error("An Unexpected Error Occured");
        setUploading(false);
      }
    }
  };
  async function handleProfilePicChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }
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
        variant="h5"
        align="left"
        gutterBottom
        color="primary"
        sx={{ fontWeight: "bold" }}
      >
        Create a post
      </Typography>

      <Box>
        <TextField
          label="Title"
          margin="normal"
          fullWidth
          {...formik.getFieldProps("Title")}
          error={formik.touched.Title && Boolean(formik.errors.Title)}
        />
        <Typography sx={{ height: "16px" }} variant="body2" color="error">
          {formik.touched.Title && formik.errors.Title}
        </Typography>
      </Box>
      <Box>
        <TextField
          label="Text"
          margin="normal"
          multiline
          rows={4}
          fullWidth
          {...formik.getFieldProps("Text")}
          error={formik.touched.Text && Boolean(formik.errors.Text)}
        />
        <Typography sx={{ height: "16px" }} variant="body2" color="error">
          {formik.touched.Text && formik.errors.Text}
        </Typography>
      </Box>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Input
          type="file"
          onChange={handleProfilePicChange}
          sx={{ display: "none" }}
          id="profile-pic-input"
        />
        <label htmlFor="profile-pic-input">
          <Button variant="contained" component="span" disabled={uploading}>
            {" "}
            Change Picture
          </Button>
        </label>
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginBottom: "10px" }}
      >
        {uploading ? "Uploading..." : "Create Post"}{" "}
      </Button>
      <PostItem
        id=""
        userUid={userData && userData.uid}
        authorName={userData && userData.firstName + " " + userData.lastName}
        title={formik.values.Title}
        text={formik.values.Text}
        imgUrl={file && URL.createObjectURL(file)}
      ></PostItem>
    </Box>
  );
}
