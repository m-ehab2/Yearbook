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
import MyProfile from "./pages/Profile/MyProfile";
import About from "./pages/about/About";
import Contact from "./pages/Contact/Contact";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const theme = createTheme(themeOptions);
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    initializeApp(firebaseConfig);

    return unsubscribe;
  }, []);
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
              path="/contact"
              element={
                <>
                  <NavBar /> <Contact /> <Footer />
                </>
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
