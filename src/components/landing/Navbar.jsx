import React from "react";
import logoimage from "../../images/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="each-section section-width" id="navbar">
      <img src={logoimage} alt="logo" width="400px" />
      <div className="button-row">
        <Link to="/login">
          <button className="black-button">Sign In</button>
        </Link>
        <Link to="/register">
          <button className="black-button">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
