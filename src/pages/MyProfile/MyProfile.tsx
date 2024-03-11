import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import LeftSideForm from "./LeftSideForm";
import { Box, CircularProgress, Grid } from "@mui/material";
import RightSideProfile from "./RightSideProfile";
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

export default function MyProfile() {
  const [userProfile, setUserProfile] = useState<UserProfile>({
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
  const [loading, setLoading] = useState<boolean>(false);
  const [reference, setReference] = useState<string>("");
  const navigate = useNavigate();
  const handleChangedDetails = (newFormValues: Partial<UserProfile>) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      ...newFormValues,
    }));
    setLoading(false);
    navigate("/mearn2024");
  };

  const handleChangedPic = async (newPicUrl: string) => {
    const cloneduserProfile = { ...userProfile };
    cloneduserProfile.profilePic = newPicUrl;
    setUserProfile(cloneduserProfile);
  };
  useEffect(() => {
    setLoading(true);
    const fetchUserProfile = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      const uid = currentUser ? currentUser.uid : null;

      if (uid) {
        const db = getFirestore();
        const usersRef = collection(db, "users");
        const userQuery = query(usersRef, where("uid", "==", uid));

        try {
          const snapshot = await getDocs(userQuery);
          snapshot.forEach((doc) => {
            setReference(doc.ref.id);
            setUserProfile(doc.data() as UserProfile);
          });
          setLoading(false);
        } catch (error) {
          console.error("Error getting user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <Box
      component="section"
      sx={{
        padding: "10px 128px",
        flexGrow: "1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <CircularProgress
          sx={{ margin: "0 auto" }}
          color="primary"
          size={"100px"}
        />
      ) : (
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={6}>
            <LeftSideForm
              handleSubmit={(e) => handleChangedDetails(e)}
              profile={userProfile}
              reference={reference}
            />
          </Grid>
          <Grid item xs={6}>
            <RightSideProfile
              profile={userProfile}
              reference={reference}
              handleChangedPic={(e) => handleChangedPic(e)}
            ></RightSideProfile>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
