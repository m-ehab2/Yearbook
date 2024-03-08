import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage.tsx";
import SignUp from "./pages/SignUp/SignUp.tsx";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";

initializeApp(firebaseConfig);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <SignUp /> },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
