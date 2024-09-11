import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Authorized({ message }) {
  return (
    <div className="unauthorized">
      <h1 className="heading-primary">{message}</h1>
      <Link
        to="/login"
        onClick={() => {
          localStorage.setItem("jtoken", "");
          toast.success("Logged Out");
        }}>
        Logout
      </Link>
    </div>
  );
}

export default Authorized;
