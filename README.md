# Password Reset FrontEnd

## NOTE: All API calls listed below are done in the onSubmit function of Formik package

## Login API call

```js
try {
  setLoggingIn(true);
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/users/login`,
    body,
    {
      withCredentials: true,
    }
  );

  localStorage.setItem("jtoken", res.data.token);
  toast.success("Logged in successfully");
  navigate(`/app/`);
} catch (err) {
  toast.error(err.response.data.message);
} finally {
  setLoggingIn(false);
}
```

## Signup API call

```js
try {
  setIsCreating(true);
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/users/signup`,
    body,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  toast.dismiss(signupToast);
  toast.success("User created succesfully");
  localStorage.setItem("jtoken", res.data.token);
  console.log(res.data.data.user._id);
  navigate(`/app`);
  console.log(res);
} catch (err) {
  console.log(err);
  toast.dismiss(signupToast);
  toast.error(err.response.data.message);
} finally {
  setIsCreating(false);
}
```

## Forgot Password API call

```js
try {
  setIsSendingEmail(true);
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/users/forgotPassword`,
    body,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "x-frontend-url": window.location.origin,
      },
    }
  );

  toast.dismiss(sendingEmailToast);
  toast.success("Token sent to email");
  console.log(res);
  navigate("/login");
} catch (err) {
  console.log(err);
  toast.dismiss(sendingEmailToast);
  toast.error(err.response.data.message);
} finally {
  setIsSendingEmail(false);
}
```

## Password Reset API call

```js
try {
  setIsUpdating(true);
  const res = await axios.patch(
    `${import.meta.env.VITE_API_URL}/api/v1/users/resetPassword/${resetToken}`,
    body
  );
  console.log(res);

  toast.success("Password changed successfully");
  localStorage.setItem("jtoken", res.data.token);
  navigate("/login");
} catch (err) {
  console.log(err);
  toast.error(err.response.data.message);
} finally {
  setIsUpdating(false);
  toast.dismiss(updateToast);
}
```

## Route Definitions

```jsx
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
```
