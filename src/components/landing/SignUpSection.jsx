import React from 'react';
import '../../index.css'

const SignUpSection = () => {
  return (
    <div class="each-section" id="sign-up-section">
      <h2>Ready to find your next gig or helping hand?</h2>
      <p>Join the community and connect with local jobs and talent</p>
      <div id="sign-up-field-container">
      <input id="email-input" placeholder="Enter your email"></input><span><button class="black-button">Sign up</button></span>
      </div>      
      <p>By clicking Sign Up, you're confirming that you agree with our Terms and Conditions.</p>
    </div>
  )
}

export default SignUpSection;
