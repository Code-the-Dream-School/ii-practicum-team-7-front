import React from 'react';
import logoimage from "../../images/logo.png";

const Navbar = () => {
  return (
    <div className="each-section" id="navbar">
      <img src={logoimage} alt="logo" width="400px" />
      <div className="button-row">
        <button className="black-button">Sign In</button>
        <button className="black-button">Sign Up</button>
      </div>
    </div>
  )
}

export default Navbar;
