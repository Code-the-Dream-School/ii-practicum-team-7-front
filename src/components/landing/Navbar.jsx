import React from 'react';
import logoimage from "../../images/logo.png";

const Navbar = () => {
  return (
    <div class="each-section" id="navbar">
      <img src={logoimage} alt="logo" width="400px" />
      <div class="button-row">
        <button class="black-button">Sign In</button>
        <button class="black-button">Sign Up</button>
      </div>
    </div>
  )
}

export default Navbar;
