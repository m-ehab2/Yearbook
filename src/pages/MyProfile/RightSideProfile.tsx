import { Box, Button, Input } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateDoc, doc, getFirestore } from "firebase/firestore";
import ProfileCard from "../../components/ProfileCard";

interface UserProfile {
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

interface RightSideProfileProps {
  profile: UserProfile | null;
  reference: string;
  handleChangedPic: (url: string) => void;
}

function RightSideProfile({
  profile,
  reference,
  handleChangedPic,
}: RightSideProfileProps) {
  const [uploading, setUploading] = useState(false);

  async function handleProfilePicChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      setUploading(true);

      try {
        const storage = getStorage();
        const storageRef = ref(storage, `profile_pics/${profile?.uid}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        const db = getFirestore();
        const userDocRef = doc(db, "users", reference);
        await updateDoc(userDocRef, { profilePic: downloadURL });
        handleChangedPic(downloadURL);
        setUploading(false);
      } catch (error) {
        console.error("Error uploading file:", error);
        setUploading(false);
      }
    }
  }

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <ProfileCard profile={profile} />
      <Input
        type="file"
        onChange={handleProfilePicChange}
        sx={{ display: "none" }}
        id="profile-pic-input"
      />
      <label htmlFor="profile-pic-input">
        <Button variant="contained" component="span" disabled={uploading}>
          {uploading ? "Uploading..." : "Change Profile Picture"}
        </Button>
      </label>
    </Box>
  );
}

export default RightSideProfile;
