import React from 'react';
import image from "../../images/landing1.jpg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="each-section" id="hero-section">
      <div>
      <h1>Your next job is just around the corner</h1>
      <p>Offer your skills or hire helping hands, right here in your neighborhood</p>
      <div className="button-row">
        <Link to="/jobs">
          <button className="black-button">Find jobs</button>
        </Link>
        <button className="white-button">Post a job</button>
      </div>        
      </div>
      <img src={image} alt="computer" width="1200"/>
    </div>
  )
}

export default HeroSection;
