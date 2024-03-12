import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { themeOptions } from "./config/themeOptions";
import NavBar from "./components/NavBar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer";
import Batch from "./pages/Batch/Batch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { firebaseConfig } from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import MyProfile from "./pages/MyProfile/MyProfile";
import About from "./pages/about/About";
import Contact from "./pages/Contact/Contact";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import UserProfile from "./pages/UserProfile/UserProfile";
import { Box, CircularProgress } from "@mui/material";
import Posts from "./pages/Posts/Posts";
import CreatePost from "./pages/CreatePost/CreatePost";
import OnePost from "./pages/OnePost/OnePost";
import EditPost from "./pages/EditOnePost/EditPost";

const theme = createTheme(themeOptions);
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        const auth = getAuth();
        await initializeApp(firebaseConfig);
        onAuthStateChanged(auth, (user) => {
          setIsLoggedIn(!!user);
        });
      } catch (error) {
        setError("Failed to initialize Firebase. Please try again later.");
      }
    };

    initializeFirebase();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoggedIn === null) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="primary" size={"100px"} />
      </Box>
    );
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route
              path={"/"}
              element={
                <>
                  <NavBar /> <Home /> <Footer />
                </>
              }
            />
            <Route
              path={"/home"}
              element={
                <>
                  <NavBar /> <Home /> <Footer />
                </>
              }
            />
            <Route
              path="/mearn2024"
              element={
                <>
                  <NavBar /> <Batch /> <Footer />
                </>
              }
            />
            <Route
              path="/myprofile"
              element={
                !isLoggedIn ? (
                  <Navigate to={"/login"} />
                ) : (
                  <>
                    <NavBar /> <MyProfile /> <Footer />
                  </>
                )
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <NavBar /> <About /> <Footer />
                </>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <>
                  <NavBar />
                  <UserProfile />
                  <Footer />
                </>
              }
            />
            <Route
              path="/posts/:id"
              element={
                <>
                  <NavBar />
                  <OnePost />
                  <Footer />
                </>
              }
            />
            <Route
              path="/posts/edit/:id"
              element={
                <>
                  <NavBar />
                  <EditPost />
                  <Footer />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <NavBar /> <Contact /> <Footer />
                </>
              }
            />
            <Route
              path="/posts"
              element={
                <>
                  <NavBar /> <Posts /> <Footer />
                </>
              }
            />
            <Route
              path="/createpost"
              element={
                !isLoggedIn ? (
                  <Navigate to="/login" />
                ) : (
                  <>
                    <NavBar /> <CreatePost /> <Footer />
                  </>
                )
              }
            />
            <Route
              path="/login"
              element={
                isLoggedIn ? <Navigate to="/myprofile" /> : <LoginPage />
              }
            />
            <Route
              path="/register"
              element={isLoggedIn ? <Navigate to="/myprofile" /> : <SignUp />}
            />
            <Route path="*" element={<h1>Error 404</h1>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
