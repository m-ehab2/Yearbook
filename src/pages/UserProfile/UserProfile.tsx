import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Box, CircularProgress, Grid, Link, Typography } from "@mui/material";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  uid: string;
  title?: string;
  phone?: string;
  currentCompany?: string;
  motto?: string;
  gitHubLink?: string;
  linkedInLink?: string;
  xLink?: string;
  profilePic?: string;
}

export default function UserProfile() {
  const { id } = useParams();
  const [userData, setUserData] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
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
  }, [id]);

  return (
    <Box sx={{ padding: { xs: "10px", md: "20px 128px" } }}>
      <Typography variant="h4">User Profile</Typography>
      {userData ? (
        <Grid container>
          <Grid item xs={6}>
            {/* <Box
              sx={{
                border: "1px solid black",
                borderRadius: "5px",
                padding: "5px 10px",
              }}
            > */}
            <Typography variant="body1">
              <Typography color={"primary"} variant="h6">
                Name
              </Typography>{" "}
              {userData.firstName} {userData.lastName}
            </Typography>
            {/* </Box> */}
            {userData.title && (
              <Typography variant="body1">
                <Typography color={"primary"} variant="h6">
                  Title:
                </Typography>{" "}
                {userData.title}
              </Typography>
            )}
            {userData.currentCompany && (
              <Typography variant="body1">
                <Typography color={"primary"} variant="h6">
                  Current Company:
                </Typography>{" "}
                {userData.currentCompany}
              </Typography>
            )}
            {userData.motto && (
              <Typography variant="body1">
                <Typography color={"primary"} variant="h6">
                  Motto:
                </Typography>{" "}
                {userData.motto}
              </Typography>
            )}
            {userData.phone && (
              <Typography variant="body1">
                <Typography color={"primary"} variant="h6">
                  Phone:
                </Typography>{" "}
                +20{userData.phone}
              </Typography>
            )}
            {userData.email && (
              <Typography variant="body1">
                <Typography color={"primary"} variant="h6">
                  Email:
                </Typography>{" "}
                {userData.email}
              </Typography>
            )}
            {userData.gitHubLink && (
              <Typography variant="body1">
                <Typography color={"primary"} variant="h6">
                  GitHub:
                </Typography>{" "}
                <Link
                  href={userData.gitHubLink}
                  target="_blank"
                  rel="noopener"
                  color={"#030303"}
                >
                  {userData.gitHubLink}
                </Link>
              </Typography>
            )}
            {userData.linkedInLink && (
              <Typography variant="body1">
                <Typography color={"primary"} variant="h6">
                  LinkedIn:
                </Typography>{" "}
                <Link
                  color={"#030303"}
                  href={userData.linkedInLink}
                  target="_blank"
                  rel="noopener"
                >
                  {userData.linkedInLink}
                </Link>
              </Typography>
            )}
            {userData.xLink && (
              <Typography variant="body1">
                <Typography color={"primary"} variant="h6">
                  X (Twitter) Link:
                </Typography>{" "}
                <Link
                  href={userData.xLink}
                  target="_blank"
                  rel="noopener"
                  color={"#030303"}
                >
                  {userData.xLink}
                </Link>
              </Typography>
            )}
          </Grid>
          <Grid item xs={6} sx={{ padding: "0px 100px" }}>
            {userData.profilePic && (
              <>
                <img
                  src={userData.profilePic}
                  alt="Profile"
                  style={{ width: "100%" }}
                />
              </>
            )}
          </Grid>
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
}
