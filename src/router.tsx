import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AuthPage from "./pages/AuthPage";
import "@radix-ui/themes/styles.css";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/signUp", element: <AuthPage /> },
  { path: "/signIn", element: <AuthPage /> },
]);
