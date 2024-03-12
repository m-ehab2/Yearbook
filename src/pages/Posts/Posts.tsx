import { Box, Button } from "@mui/material";
import PostItem from "../../components/PostItem";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
interface PostData {
  title: string;
  text: string;
  uid: string;
  userName: string;
  picUrl: string;
  id: string;
}
export default function Posts() {
  const [postData, setPostData] = useState<PostData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const db = getFirestore();
        const postsCollection = collection(db, "posts");
        const postsSnapshot = await getDocs(postsCollection);
        const postDataArray: PostData[] = [];
        postsSnapshot.forEach((doc) => {
          const id = doc.id;
          const data = doc.data() as PostData;
          postDataArray.push({ ...data, id });
        });
        setPostData(postDataArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Box
      sx={{
        padding: "20px 128px",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        position: "relative",
        flexGrow: "1",
      }}
    >
      <Box sx={{ margin: "0px auto" }}>
        <Button to={"/createpost"} component={RouterLink} variant="contained">
          Add A Post
        </Button>
      </Box>
      {!loading
        ? postData.map((element) => {
            return (
              <PostItem
                key={element.id}
                title={element.title}
                text={element.text}
                userUid={element.uid}
                imgUrl={element.picUrl}
                authorName={element.userName}
                id={element.id}
              />
            );
          })
        : ""}
    </Box>
  );
}
