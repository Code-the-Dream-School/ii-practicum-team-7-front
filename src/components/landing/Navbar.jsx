import React, {useState, useEffect} from "react";
import axios from "axios";
import logoimage from "../../images/logo1.png";
import { Link, useLocation } from "react-router-dom";
import { navbarRouteStyles } from "../../routeStyles";

const Navbar = () => {
    //current logic now to check if there is current user or not.  
    //will be using it to hide certain buttons in the navbar
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

  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const matchedKey = Object.keys(navbarRouteStyles).find((route) =>
    currentPath === route || currentPath.startsWith(route + "/")
  );

  const matchedStyles = navbarRouteStyles[matchedKey] || { navbar: "bg-white", button: "btn-blk", text: "text-black"};
  const { navbar, button, text } = matchedStyles;

  return (
    <div className={`${navbar} ${text} fixed top-0 left-0 right-0 z-50 flex items-center px-2 sm:px-4 md:px-16 py-2 sm:py-1`} id="navbar">
      {/* Logo */}
      <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
      <img src={logoimage} alt="logo" className="w-32 h-auto"/>
      <div className="flex flex-col leading-tight">
        <h3>CNC</h3>
        <h5>CONNECT AND COLLABORATE</h5>
      </div>
      </Link>

      {/* Spacer */}
      <div className="flex-grow"></div>
      
      {/* Nav Button */}
      <div className="flex items-center gap-4">
        <Link to="/login">
          <button className={`${button} whitespace-nowrap ml-4 py-2`}>
            Sign in
          </button>
        </Link>

        {/* Menu Button */}
        <button className="text-4xl" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Slide-Out Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-inherit transform transition-transform duration-300 ease-in-out ${
        menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 gap-4">
          <button className="self-end text-2xl" onClick={() => setMenuOpen(false)}>
            ✕
          </button>
          <Link to="/jobs" onClick={() => setMenuOpen(false)}>Job Search</Link>
          {currentUserId && 
          <>
            <Link to={`/profile/${currentUserId}`}>Profile</Link>
            <button className="black-button">Sign out</button>
          </>
        }
        {!currentUserId && 
          <>
            <Link to="/login">
              <button className="black-button">Sign In</button>
            </Link>
            <Link to="/register">
              <button className="black-button">Sign Up</button>
            </Link>
          </>
        }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
