import React from 'react';
import firstimage from "../../images/how1.jpg";
import secondimage from "../../images/how2.jpg";
import thirdimage from "../../images/how3.jpg";

const HowSection = () => {
  return (
    <div className="section-container bg-ny-pink-dark text-white">
      
      {/* Heading */}
      <div className="mb-16">
        <h2 className='mb-4'>How it Works</h2>
        <p>Finding the right person for the job or the perfect job for you, made simple</p>
      </div>

      {/* Grid */}
      <div className="grid gap-12 lg:grid-cols-3">

      {/* Step 1 */}
      <div className="flex flex-col md:flex-col-reverse justify-between items-center text-center h-full">
        <div>
          <h3 className="text-h3 mb-4">Create Your Account</h3>
          <p className="mb-6">Sign up and create your profile</p>
        </div>          
        <img src={firstimage} alt="create" className="mb-8 w-full h-80 object-cover"></img>
      </div>

      {/* Step 2 */}
      <div className="flex flex-col md:flex-col-reverse justify-between items-center text-center h-full">
        <div>
          <h3 className="text-h3 mb-4">Browse or Post Jobs</h3>
          <p className="mb-6">Explore gigs nearby or post your project</p>
        </div>
        <img src={secondimage} alt="look" className="mb-8 w-full h-80 object-cover"></img>
      </div>

      {/* Step 3 */}
      <div className="flex flex-col md:flex-col-reverse justify-between items-center text-center h-full">
        <div>
          <h3 className="text-h3 mb-4">Connect and Collaborate</h3>
          <p className="mb-6">Work together and complete your project</p>
        </div>
        <img src={thirdimage} alt="together" className="mb-8 w-full h-80 object-cover"></img>
      </div>

    </div>

  </div>
  )
}

export default HowSection;
