import React, {useState, useEffect} from "react";
import axios from "axios";
import logoimage from "../../images/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/auth/current-user",
        { withCredentials: true }
      );
      setCurrentUserId(data.userId);
    } catch (error) {
      console.log("Error fetch current user,", error.message);
    }
  };
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <div className="each-section section-width" id="navbar">
      <img src={logoimage} alt="logo" width="400px" />
      <div className="button-row">
        <Link to="/" className="home-link">Home</Link>
        {currentUserId && <Link to={`/profile/${currentUserId}`}>Profile</Link>}
        {!currentUserId && <Link to="/login">
          <button className="black-button">Sign In</button>
        </Link>}
        {!currentUserId && <Link to="/register">
          <button className="black-button">Sign Up</button>
        </Link>}
        {currentUserId && <button className="black-button">Sign out</button>}
      </div>
    </div>
  );
};

export default Navbar;
