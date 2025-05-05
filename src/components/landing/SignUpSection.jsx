import React from 'react';

const SignUpSection = () => {
  return (
    <div className="section-container bg-monte-carlo-dark">
      <div className="section-content">
        <h2>Ready to find your next gig or helping hand?</h2>
        <p className="text-[18px]">Join the community and connect with local jobs and talent</p>
        <div className="flex items-center gap-2">
          <input
            id="email-input"
            placeholder="Enter your email"
            className="bg-inherit border-b border-gray-600 outline-none flex-1 pb-3.5 leading-none"
          />
          <button className="btn-blk">Sign up</button>
        </div>
            
      <p className="text-xs">By clicking Sign Up, you're confirming that you agree with our Terms and Conditions.</p>
      </div>
    </div>
  )
}

export default SignUpSection;
