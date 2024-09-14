import { useFormik } from "formik";
import InputGroup from "../components/InputGroup";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
const validate = (values) => {
  const errors = {};
  if (!values.password) {
    errors.password = "Please enter a password";
  } else if (values.password.length < 8) {
    errors.password = "Password must contain atleast 8 characters";
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = "This field cannot be empty";
  } else if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = "Passwords are not same";
  }

  return errors;
};
function ResetPassword() {
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const [isUpdating, setIsUpdating] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    validate,
    onSubmit: async (values) => {
      const body = { ...values };

      delete body.passwordConfirm;
      const updateToast = toast.loading("Changing password...");
      try {
        setIsUpdating(true);
        const res = await axios.patch(
          `${
            import.meta.env.VITE_API_URL
          }/api/v1/users/resetPassword/${resetToken}`,
          body
        );

        toast.success("Password changed successfully");
        localStorage.setItem("jtoken", res.data.token);
        navigate("/login");
      } catch (err) {
        toast.error(err.response.data.message);
      } finally {
        setIsUpdating(false);
        toast.dismiss(updateToast);
      }
    },
  });

  return (
    <form className="login-block" noValidate onSubmit={formik.handleSubmit}>
      <h1 className="heading-primary">Forgot Password</h1>
      <InputGroup
        label="New Password"
        labelFor="password"
        placeholderText="New Password"
        type="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.touched.password && formik.errors.password}
        errMsg={formik.errors.password}
      />
      <InputGroup
        label="Confirm Password"
        labelFor="passwordConfirm"
        placeholderText="Confirm Password"
        type="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.passwordConfirm}
        error={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
        errMsg={formik.errors.passwordConfirm}
      />
      <div className="cta">
        <Link to="/login">Back to Login</Link>
      </div>
      <button type="submit" disabled={isUpdating}>
        Change Password
      </button>
    </form>
  );
}

export default ResetPassword;
