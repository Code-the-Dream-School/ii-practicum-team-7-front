import React from 'react';
import '../../index.css'
import firstimage from "../../images/how1.jpg";
import secondimage from "../../images/how2.jpg";
import thirdimage from "../../images/how3.jpg";

const HowSection = () => {
  return (
    <div class="each-section">
      <div id="each-how-section-1">
        <h2>How it Works</h2>
        <p>Finding the right person for the job or the perfect job for you, made simple</p>
      </div>

      <div id="each-how-section-2">
        <div>
          <img src={firstimage} alt="create"></img>
          <h3>Create Your Account</h3>
          <p>Sign up and create your profile</p>
        </div>
        <div>
          <img src={secondimage} alt="look"></img>
          <h3>Browse or Post Jobs</h3>
          <p>Explore gigs nearby or post your project</p>
        </div>
        <div>
          <img src={thirdimage} alt="together"></img>
          <h3>Connect and Collaborate</h3>
          <p>Work together and complete your project</p>
        </div>
      </div>

    </div>
  )
}

export default HowSection;
