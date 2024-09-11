import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { Toaster } from "react-hot-toast";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to="app" />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="resetPassword/:resetToken" element={<ResetPassword />} />
          <Route path="app/" element={<Welcome />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
