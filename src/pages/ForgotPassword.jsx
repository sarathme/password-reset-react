import { useFormik } from "formik";
import InputGroup from "../components/InputGroup";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Please provide a email address";
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)
  ) {
    errors.email = "Please enter a valid email address";
  }

  return errors;
};
function ForgotPassword() {
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { email: "" },
    validate,
    onSubmit: async (values) => {
      const body = { ...values };

      const sendingEmailToast = toast.loading("Loading...");
      try {
        setIsSendingEmail(true);
        const res = await axios.post(
          "https://password-reset-loz2.onrender.com//api/v1/users/forgotPassword",
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
    },
  });
  console.log(window.location.origin);
  return (
    <form className="login-block" noValidate onSubmit={formik.handleSubmit}>
      <h1 className="heading-primary">Forgot Password</h1>
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

      <button type="submit" disabled={isSendingEmail}>
        Send Email
      </button>
    </form>
  );
}

export default ForgotPassword;
