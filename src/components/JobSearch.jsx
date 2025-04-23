import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './JobSearch.css';


const JobSearch = () => {

  //an array of job categories
  const jobCategories = [
    "Administration",
    "Customer Service",
    "Education",
    "Engineering",
    "Finance",
    "Healthcare",
    "Hospitality",
    "Information Technology",
    "Logistics",
    "Maintenance",
    "Manufacturing",
    "Marketing",
    "Retail",
    "Sales",
    "Security",
    "Skilled Trades",
    "Transportation",
  ];

  //job postings test samples no backend yet.
  const jobPostings = [
    {
      title: "Administrative Assistant",
      company: "CityWorks Solutions",
      location: "Springfield, IL",
      category: "administration",
      type: "Full-time",
    },
    {
      title: "Customer Support Specialist",
      company: "HelpHub",
      location: "Buffalo, NY (Remote)",
      category: "customer-service",
      type: "Part-time",
    },
    {
      title: "High School Math Teacher",
      company: "Greenwood Academy",
      location: "Greensboro, NC",
      category: "education",
      type: "Full-time",
    },
    {
      title: "Mechanical Engineer",
      company: "TruBuild Inc.",
      location: "Cincinnati, OH",
      category: "engineering",
      type: "Full-time",
    },
    {
      title: "Staff Accountant",
      company: "BalancePoint Financial",
      location: "Tampa, FL",
      category: "finance",
      type: "Full-time",
    },
    {
      title: "Registered Nurse (RN)",
      company: "Sunrise Health",
      location: "Boise, ID",
      category: "healthcare",
      type: "Contract",
    },
    {
      title: "Hotel Front Desk Clerk",
      company: "Seaside Inn & Suites",
      location: "Myrtle Beach, SC",
      category: "hospitality",
      type: "Part-time",
    },
    {
      title: "Junior Web Developer",
      company: "BluePixel Tech",
      location: "Des Moines, IA",
      category: "information-technology",
      type: "Full-time",
    },
    {
      title: "Warehouse Associate",
      company: "FastShip Logistics",
      location: "Columbus, OH",
      category: "logistics",
      type: "Full-time",
    },
    {
      title: "Maintenance Technician",
      company: "Core Facilities Group",
      location: "Madison, WI",
      category: "maintenance",
      type: "Full-time",
    },
  ];

  const [ jobPhrase, setJobPhrase ] = useState("");
  const [ zipCode, setZipCode ] = useState("");
  const [ category, setCategory ] = useState("");
  const [ employmentType, setEmploymentType ] = useState([]);
  const [ workplaceType, setWorkplaceType ] = useState([]);

  const getAllFilters = () => {
    console.log(`This is the job phrase: ${jobPhrase}`);
    console.log(`This is the zip code: ${zipCode}`);
    console.log(`This is the category: ${category}`);
    console.log(`This is the employment type: ${employmentType}`);
    console.log(`This is the workplace type: ${workplaceType}`);
  } 
  const clearAllFilters = () => {
    setJobPhrase("");
    setZipCode("");
    setCategory("");
    setEmploymentType("");
    setWorkplaceType("")
    console.log(`All cleared`);
  } 

  return (
    <div className="job-search-page">
      <header className="header">
        <h1>CNC</h1>
        <nav>
          <Link to="/"><a href="#">Home</a></Link>
          <a href="#">Jobs</a>
          <a href="#">Companies</a>
          <a href="#">About</a>
        </nav>
        <button className="signin-btn">Sign In</button>
      </header>

      <div className="main-content">
        <aside className="sidebar">

          <input 
            type="text"
            className="input" 
            placeholder="Search jobs..."
            value={jobPhrase}
            onChange={(e) => setJobPhrase(e.target.value)}
          />

          <input
            type="text"
            className="input" 
            placeholder="Enter location..."
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />

          <select 
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category...</option>
            {jobCategories.map(jobCategory => (
              <option value={jobCategory.toLowerCase()}>{jobCategory}</option>
            ))}
          </select>

          <div className="filters">
            <fieldset>
              <legend>Employment Type</legend>
              <div className="employment-type">
                <label><input type="checkbox" /> Full-time</label>
                <label><input type="checkbox" /> Part-time</label>
                <label><input type="checkbox" /> Contract</label>
              </div>
            </fieldset>

            <fieldset>
              <legend>Workplace Type</legend>
              <div className="workplace-type">
                <label><input type="checkbox" /> In-person</label>
                <label><input type="checkbox" /> Remote</label>
                <label><input type="checkbox" /> Hybrid</label>
              </div>
            </fieldset>
          </div>
          <button onClick={() => getAllFilters()}>Search</button>
          <button onClick={() => clearAllFilters()}>Reset</button>
        </aside>

        <section className="job-listings">

          {jobPostings.map((jobPosting, index) => (
            <div className="job-card" key={index}>
              <h3>{jobPosting.title}</h3>
              <p className="company">{jobPosting.company}</p>
              <p className="location">{jobPosting.location}</p>
              <span className="badge">{jobPosting.type}</span>
              <span className="badge">{jobPosting.category}</span>
              <button className="apply-btn">Apply</button>
            </div>
          ))}
          <button className="load-more">Load More</button>
        </section>
      </div>
    </div>
  )
}

export default JobSearch;
