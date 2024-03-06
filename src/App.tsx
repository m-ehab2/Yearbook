import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { themeOptions } from "./config/themeOptions";
const theme = createTheme(themeOptions);

import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <NavBar />
      </ThemeProvider>
    </>
  );
}

export default App;
