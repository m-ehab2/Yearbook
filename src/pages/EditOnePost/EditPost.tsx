import {
  Box,
  Button,
  CircularProgress,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import * as Yup from "yup";
import PostItem from "../../components/PostItem";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, uploadBytes, ref } from "firebase/storage";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
interface PostData {
  title: string | null;
  userName: string | null;
  text: string | null;
  picUrl: string | null;
  uid: string | null;
  id: string;
}
export default function EditPost() {
  const [updating, setUpdating] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      try {
        if (id) {
          const db = getFirestore();
          const postDocRef = doc(db, "posts", id);
          const postDocSnap = await getDoc(postDocRef);

          if (postDocSnap.exists()) {
            const postData = {
              id: postDocSnap.id,
              ...postDocSnap.data(),
            } as PostData;
            setPost(postData);
            initialValues.Title = postData.title;
            initialValues.Text = postData.text;
            setLoading(false);
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [id]);
  const initialValues = {
    Title: post?.title,
    Text: post?.text,
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
  const handleSubmit = async (values: typeof initialValues) => {
    try {
      setUpdating(true);
      const db = getFirestore();
      const postDocRef = doc(db, "posts", id || "");
      if (file) {
        const storage = getStorage();
        const storageRef = ref(storage, `post_pics/${Date.now()}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        await updateDoc(postDocRef, {
          title: values.Title,
          text: values.Text,
          picUrl: downloadURL,
        });
      } else {
        await updateDoc(postDocRef, { title: values.Title, text: values.Text });
      }
      setUpdating(false);
      toast.success("Post updated successfully");
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("An unexpected error occurred");
      setUpdating(false);
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
    <Box>
      {loading ? (
        <CircularProgress />
      ) : post ? (
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
            Edit a post
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
              <Button variant="contained" component="span" disabled={updating}>
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
            {updating ? "Updating..." : "Edit Post"}{" "}
          </Button>
          <PostItem
            id={post?.id}
            userUid={post?.uid}
            authorName={post?.userName}
            title={post?.title}
            text={post?.text}
            imgUrl={file ? URL.createObjectURL(file) : post?.picUrl}
          ></PostItem>
        </Box>
      ) : (
        <Typography variant="h5">No post found</Typography>
      )}
    </Box>
  );
}
