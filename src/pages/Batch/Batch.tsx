import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { Box, CircularProgress } from "@mui/material";
import ProfileCard from "../../components/ProfileCard";

interface UserData {
  firstName: string;
  lastName: string;
  uid: string;
  title?: string;
  motto?: string;
  gitHubLink?: string;
  linkedInLink?: string;
  xLink?: string;
  profilePic?: string;
}

export default function Batch() {
  const [userData, setUserData] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const userDataArray: UserData[] = [];
        usersSnapshot.forEach((doc) => {
          userDataArray.push(doc.data() as UserData);
        });
        setUserData(userDataArray);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        padding: "10px 128px",
        display: "flex",
        flexWrap: "wrap",
        gap: "20px 10px",
        margin: "10px auto",
        justifyContent: "center",
        flexDirection: "row",
        flexGrow: "1",
      }}
    >
      {userData ? (
        userData.map((user) => {
          return (
            user.motto &&
            user.title && <ProfileCard key={user.uid} profile={user} />
          );
        })
      ) : (
        <CircularProgress color="primary" size={"100px"} />
      )}
    </Box>
  );
}
