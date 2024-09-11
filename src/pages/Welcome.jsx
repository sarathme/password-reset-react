import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import UnAuthorized from "../components/UnAuthorized";
import Authorized from "../components/Authorized";
import toast from "react-hot-toast";

function Welcome() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  // const navigate = useNavigate();
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/users/protect`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jtoken")}`,
            },
          }
        );

        setUser(res.data.data.user);
      } catch (err) {
        toast.error(err.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []);
  console.log(localStorage.getItem("jtoken"));
  return (
    <div className="login-block">
      {isLoading && <Spinner />}
      {!isLoading && !Object.keys(user).length && (
        <UnAuthorized message="You are not Loggedin. Please login to continue" />
      )}
      {!isLoading && Object.keys(user).length > 0 && (
        <Authorized message={`Welcome ${user.name}`} />
      )}
    </div>
  );
}

export default Welcome;
