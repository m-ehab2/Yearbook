import { CircularProgress, Container, Link, Typography } from "@mui/material";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

interface PostData {
  title: string | null;
  userName: string | null;
  text: string | null;
  picUrl: string | null;
  uid: string | null;
  id: string;
}

export default function OnePost() {
  const { id } = useParams<{ id: string }>();
  const [postData, setPostData] = useState<PostData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
            setPostData(postData);
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

  return (
    <Container
      sx={{ flexGrow: "1", padding: { xs: "20px", md: "20px 128px" } }}
    >
      {loading ? (
        <CircularProgress />
      ) : postData ? (
        <div>
          <Typography variant="h4" gutterBottom>
            {postData.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Author:{" "}
            <Link to={`/profile/${postData.uid}`} component={RouterLink}>
              {postData.userName}
            </Link>
          </Typography>
          {postData.picUrl && (
            <img
              src={postData.picUrl}
              alt="Post"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
          <Typography variant="body1" paragraph>
            {postData.text}
          </Typography>
        </div>
      ) : (
        <Typography variant="h5">No post found</Typography>
      )}
    </Container>
  );
}
