import { Box } from "@mui/material";
import Hero from "./Hero";
import Features from "./Features";
import HowToUse from "./HowToUse";

export default function Home() {
  return (
    <Box sx={{ padding: { xs: "20px", md: "10px 128px" } }}>
      <Hero />
      <Features />
      <HowToUse />
    </Box>
  );
}
