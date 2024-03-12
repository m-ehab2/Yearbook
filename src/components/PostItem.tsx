import { Box, Button, Link, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
interface PostData {
  title: string | null;
  authorName: string | null;
  text: string | null;
  imgUrl: string | null;
  userUid: string | null;
  id: string;
}
export default function PostItem({
  title,
  authorName,
  text,
  imgUrl,
  userUid,
  id,
}: PostData) {
  const auth = getAuth();
  useEffect(() => {}, []);
  return (
    <Box
      bgcolor={"primary"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: { xs: "column-reverse", md: "row" },
        gap: "10px",
        boxShadow: "0px 6px 7px 1px rgba(0,0,0,0.3)",
        borderRadius: "10px",
        borderColor: "primary.main",
        borderWidth: "1px",
        borderStyle: "solid",
        height: { md: "200px" },
        padding: "10px 20px",
      }}
    >
      <Box sx={{ width: { xs: "100%", md: "80%" } }}>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body1">
          By{" "}
          <Link to={`/profile/${userUid}`} component={RouterLink}>
            {authorName}
          </Link>
        </Typography>
        <Typography
          sx={{
            margin: "10px 0px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {text}
        </Typography>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button
            to={`/posts/${id}`}
            component={RouterLink}
            variant={"contained"}
          >
            Read More
          </Button>
          {auth.currentUser?.uid === userUid && (
            <Button
              to={`/posts/edit/${id}`}
              component={RouterLink}
              variant={"contained"}
            >
              Edit
            </Button>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "20%" },
          height: { xs: "200px", md: "90%" },
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {imgUrl && (
          <img
            src={imgUrl}
            alt=""
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        )}
      </Box>
    </Box>
  );
}
