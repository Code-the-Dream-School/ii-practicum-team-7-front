import React from 'react';
import image from "../../images/landing1.jpg";

const HeroSection = () => {
  return (
    <div class="each-section" id="hero-section">
      <div>
      <h1>Your next job is just around the corner</h1>
      <p>Offer your skills or hire helping hands, right here in your neighborhood</p>
      <div class="button-row">
        <button class="black-button">Find jobs</button>
        <button class="white-button">Post a job</button>
      </div>        
      </div>
      <img src={image} alt="computer" width="1200"/>
    </div>
  )
}

export default HeroSection;
