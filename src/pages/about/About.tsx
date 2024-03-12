import { Box, Typography } from "@mui/material";

export default function About() {
  return (
    <Box
      sx={{
        padding: { xs: "20px", md: "20px 128px" },
        flexGrow: "1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "top",
      }}
    >
      <Typography variant="h4" gutterBottom color="primary">
        About BATCHBOOK
      </Typography>
      <Typography variant="body1">
        Welcome to BatchBook, a project individually developed as part of the
        React course instructed by Engineer Ahmed Zaghloul at the Information
        Technology Institute (ITI). This platform is a key component of the
        MEARN program, aimed at providing comprehensive training in modern web
        development technologies.
        <br />
        <br />
        BatchBook serves as a practical application of the concepts learned
        throughout the React course. It offers a space for students and alumni
        of the MEARN program to showcase their skills, connect with peers, and
        collaborate on projects. Through BatchBook, participants can enhance
        their learning experience and build a strong professional network within
        the MEARN community.
        <br />
        <br />
        We invite you to explore BatchBook, contribute to its growth, and
        leverage its features to maximize your learning journey in web
        development. Together, let's make BatchBook a valuable resource for all
        MEARN program participants.
      </Typography>
    </Box>
  );
}
