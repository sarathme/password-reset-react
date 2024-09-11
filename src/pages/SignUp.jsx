import { Link, useNavigate } from "react-router-dom";
import InputGroup from "../components/InputGroup";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
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
  if (!values.name) {
    errors.name = "Please provide a name";
  }
  if (!values.password) {
    errors.password = "Please enter a password";
  } else if (values.password.length < 8) {
    errors.password = "Password must contain atleast 8 characters";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "This field cannot be empty";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords are not same";
  }

  return errors;
};

function SignUp() {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      const body = { ...values };

      delete body.confirmPassword;
      const signupToast = toast.loading("Loading...");
      try {
        setIsCreating(true);
        const res = await axios.post(
          "https://password-reset-loz2.onrender.com//api/v1/users/signup",
          body,
          {
            withCredentials: true,
          }
        );

        toast.dismiss(signupToast);
        toast.success("User created succesfully");
        localStorage.setItem("jtoken", res.data.token);
        console.log(res.data.token);
        navigate(`/app`);
      } catch (err) {
        console.log(err);
        toast.dismiss(signupToast);
        toast.error(err.response.data.message);
      } finally {
        setIsCreating(false);
      }
    },
  });

  return (
    <form className="login-block" noValidate onSubmit={formik.handleSubmit}>
      <h1 className="heading-primary">Create New Account</h1>
      <InputGroup
        label="Name"
        labelFor="name"
        placeholderText="Enter Your Name"
        type="text"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.name}
        error={formik.touched.name && formik.errors.name}
        errMsg={formik.errors.name}
      />
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
      <InputGroup
        label="Confirm Password"
        labelFor="confirmPassword"
        placeholderText="Retype your password"
        type="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.confirmPassword}
        error={formik.touched.confirmPassword && formik.errors.confirmPassword}
        errMsg={formik.errors.confirmPassword}
      />
      <div className="cta">
        <Link to="/login">Already have a acoount? Login</Link>
      </div>
      <button type="submit" disabled={isCreating}>
        Create User
      </button>
    </form>
  );
}

export default SignUp;
