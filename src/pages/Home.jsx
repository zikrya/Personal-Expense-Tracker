import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Home = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logout(navigate("/"));
        } catch (err) {
            console.error("Error logging out:", err);
        }
    };
    return (
        <>
        <h1>Home Page</h1>
        {currentUser && <button
      onClick={handleLogout}
        type="button"
        data-ripple-light="true"
      >
        <span>logout</span>
      </button>}
        </>
     );
}

export default Home;