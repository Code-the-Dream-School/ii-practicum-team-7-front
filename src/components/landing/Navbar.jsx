import {useState, useEffect, useRef} from "react";
import axios from "axios";
import logoimage from "../../images/logo1.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navbarRouteStyles } from "../../routeStyles";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentUserURL = "http://localhost:8000/api/v1/auth/current-user";
  const options = { withCredentials: true };

  //Checks if there is current user or not.
  //will be using currentUserId to hide certain buttons in the navbar
  const [currentUserId, setCurrentUserId] = useState(null);
  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get(currentUserURL, options);
      setCurrentUserId(data.userId);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setCurrentUserId(null);
      } else {
        console.log("Error fetching current user:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [location]);

  //To logout user
  const logoutURL = "http://localhost:8000/api/v1/auth/logout";
  const logoutCurrentUser = async () => {
    try {
      await axios.post(logoutURL, {}, options);
      setCurrentUserId((prev) => null);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log("Error logging out,", error.message);
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const currentPath = location.pathname;
  const matchedKey = Object.keys(navbarRouteStyles).find(
    (route) => currentPath === route || currentPath.startsWith(route + "/")
  );

  const matchedStyles = navbarRouteStyles[matchedKey] || {
    navbar: "bg-white",
    button: "btn-blk",
    text: "text-black",
  };
  const { navbar, button, text } = matchedStyles;

  const menuRef = useRef(null);

  // Close the menu if user clicks away
  useEffect(() => {
    const handleClickAway = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickAway);
    
    return () => {
      document.removeEventListener("mousedown", handleClickAway);
    };

  }, [menuOpen]);

  return (
    <div
      className={`${navbar} ${text} fixed top-0 left-0 right-0 z-50 flex items-center px-2 sm:px-4 md:px-16 py-2 sm:py-1`}
      id="navbar"
    >
      {/* Logo */}
      <Link
        to="/"
        onClick={() => setMenuOpen(false)}
        className="flex items-center gap-2"
      >
        <img src={logoimage} alt="logo" className="w-32 h-auto" />
        <div className="flex flex-col leading-tight">
          <h3>CNC</h3>
          <h5>CONNECT AND COLLABORATE</h5>
        </div>
      </Link>

      {/* Spacer */}
      <div className="flex-grow"></div>

      {/* Nav Button */}
      <div className="flex items-center gap-4">
        <Link to={"/"}>
          <button className={`${button} whitespace-nowrap py-2`}>Home</button>
        </Link>
        {!currentUserId && 
          <>
            <Link to="/login">
              <button className={`${button} whitespace-nowrap ml-4 py-2`}>
                Sign In
              </button>
            </Link>
            <Link to="/register">
              <button className={`${button} whitespace-nowrap ml-4 py-2`}>
                Sign Up
              </button>
            </Link>
          </>
        )}
        {currentUserId && (
          <button
            className={`${button} whitespace-nowrap ml-4 py-2`}
            onClick={() => logoutCurrentUser()}
          >
            Sign out
          </button>
        )}
        }
        {currentUserId && 
          <button className={`${button} whitespace-nowrap ml-2 py-2`} onClick={() => logoutCurrentUser()}>Sign out</button>
        }

        {/* Menu Button */}
        <button className="text-4xl" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Slide-Out Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-64 bg-inherit transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 gap-4">
          <button
            className="self-end text-2xl"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
          <Link to="/jobs" onClick={() => setMenuOpen(false)}>
            Find Jobs
          </Link>
          <Link to="/create-job" onClick={() => setMenuOpen(false)}>
            Post a Job
          </Link>
          {currentUserId && (
            <>
              <Link to={`/profile/${currentUserId}`}>Profile</Link>
              <button onClick={logoutCurrentUser} className="text-left mt-8">
                Sign out
              </button>
            </>
          )}
          {!currentUserId && (
            <>
              <Link to="/login">
                <button>Sign In</button>
              </Link>
              <Link to="/register">
                <button>Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
