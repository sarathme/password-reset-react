import { Link, useNavigate } from "react-router-dom";
import InputGroup from "../components/InputGroup";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

const initialValues = {
  email: "",
  password: "",
};

const validate = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = "Please provide a email address";
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)
  ) {
    errors.email = "Please enter a valid email address";
  }
  if (!values.password) {
    errors.password = "Please enter a password";
  } else if (values.password.length < 8) {
    errors.password = "Password must contain atleast 8 characters";
  }

  return errors;
};
function Login() {
  const [isLoggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      const body = { ...values };
      const loginToast = toast.loading("Logging In Please Wait...");
      try {
        setLoggingIn(true);
        const res = await axios.post(
          "http://127.0.0.1:3000/api/v1/users/login",
          body
        );
        console.log(res);
        localStorage.setItem("jtoken", res.data.token);
        navigate(`/app`);
      } catch (err) {
        toast.error(err.response.data.message);
        console.log(err);
      } finally {
        setLoggingIn(false);
        toast.dismiss(loginToast);
      }
    },
  });

  return (
    <form className="login-block" noValidate onSubmit={formik.handleSubmit}>
      <h1 className="heading-primary">Login</h1>
      <InputGroup
        label="Email"
        labelFor="email"
        placeholderText="Email Address"
        type="email"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.touched.email && formik.errors.email}
        errMsg={formik.errors.email}
      />
      <InputGroup
        label="Password"
        labelFor="password"
        placeholderText="Your Password"
        type="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.touched.password && formik.errors.password}
        errMsg={formik.errors.password}
      />
      <div className="cta">
        <Link to="/signup">Don&apos;t have a account? Sign Up</Link>
        <Link to="/forgotPassword">Forgot Password?</Link>
      </div>
      <button type="submit" disabled={isLoggingIn}>
        Login
      </button>
    </form>
  );
}

export default Login;
