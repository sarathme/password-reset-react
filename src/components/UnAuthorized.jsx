import { Link } from "react-router-dom";

function UnAuthorized({ message }) {
  return (
    <div className="unauthorized">
      <h1 className="heading-primary">{message}</h1>
      <div className="cta">
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

export default UnAuthorized;
