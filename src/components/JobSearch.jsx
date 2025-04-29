import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from "../images/logo1.png";
import jobSearch from "../images/jobsearch.jpg";
import FooterSection from  './landing/FooterSection.jsx';
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

  //an array of radius
  const radiusList = [
    1, 5, 10, 15, 25, 50
  ]

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
  const [ radius, setRadius ] = useState("");
  const [ category, setCategory ] = useState("");
  const [ employmentType, setEmploymentType ] = useState({
    fullTime: false,
    partTime: false,
    contract: false
  });
  const [ workplaceType, setWorkplaceType ] = useState({
    inPerson: false,
    remote: false,
    hybrid: false
  });

  //Function that will filter the job listing based on the phrases and set filters
  const getAllFilters = () => {
    console.log(`This is the job phrase: ${jobPhrase}`);
    console.log(`This is the category: ${category}`);

    console.log(`This is the zip code: ${zipCode}`);
    console.log(`This is radius: ${radius}`);
    
    console.log(`This is the employment type: full-time: ${employmentType.fullTime}, part-time: ${employmentType.partTime}, contract: ${employmentType.contract}`);
    console.log(`This is the workplace type: in-person: ${workplaceType.inPerson}, remote: ${workplaceType.remote}, hybrid: ${workplaceType.hybrid}`);
  } 

  const employmentCheckboxChecker = (e) => {
    const {name, checked} = e.target;
    setEmploymentType((prev) => ({
      ...prev,
      [name]: checked
    }))
  }

  const workplaceTypeCheckboxChecker = (e) => {
    const {name, checked} = e.target;
    setWorkplaceType((prev) => ({
      ...prev,
      [name]: checked
    }))
  }

  //Function that clears all the search phrases and filters
  const clearAllFilters = () => {
    setJobPhrase("");
    setZipCode("");
    setCategory("");
    setEmploymentType({
      fullTime: false,
      partTime: false,
      contract: false
    });
    setWorkplaceType({
      inPerson: false,
      remote: false,
      hybrid: false
    })
  } 

  return (
    <div className="job-search-page">
      <header className="header section-width">
        <img src={logo} alt="logo" width="100px"/>
        <nav>
          <Link to="/" className="home-link">Home</Link>
          <button className="signin-btn">Sign In</button>
        </nav>
      </header>

      <div className="main-content section-width">
        <section className="search-area section-width">

          <div className="text-section">
            <h2>Search Job Listings</h2>

            <div className="input-fields">
              <input 
              type="text"
              className="input" 
              placeholder="Enter the job title..."
              value={jobPhrase}
              onChange={(e) => setJobPhrase(e.target.value)}
              />

              <select 
              className="input"
              id="select-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              >
              <option value="">Select Category...</option>
              {jobCategories.map((jobCategory, index) => (
                <option value={jobCategory.toLowerCase()} key={`${jobCategory}-${index}`}>{jobCategory}</option>
              ))}
              </select>
            </div>

            <div className="input-fields">
              <input
                  type="text"
                  className="input" 
                  placeholder="Enter location..."
                  value={zipCode}
                  inputMode="numeric"
                  onChange={(e) => setZipCode(e.target.value)}
                />
                
              <select
                className="input"
                id="select-radius"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
              >
                <option value="">Select radius</option>
                {radiusList.map((radius,index) =>
                  radius === 1 ? (
                  <option value={radius} key={`${radius}-${index}`}>{radius} mile</option>
                ):(<option value={radius}>{radius} miles</option>
                ))}
              </select>
            </div>
           
            <div className="checkboxes">
              <fieldset>
                <legend>Employment Type</legend>
                <div className="employment-type">
                  <label><input 
                          className="checkbox-input"
                          type="checkbox"
                          name="fullTime" 
                          onChange={employmentCheckboxChecker}
                          checked={employmentType.fullTime}
                          /><span>Full-time</span></label>
                  <label><input 
                          type="checkbox"
                          name="partTime"  
                          onChange={employmentCheckboxChecker}
                          checked={employmentType.partTime}
                          /><span>Part-time</span></label>
                  <label><input 
                          type="checkbox"
                          name="contract"  
                          onChange={employmentCheckboxChecker}
                          checked={employmentType.contract}
                          /><span>Contract</span></label>
                </div>
              </fieldset>

              <fieldset>
                <legend>Workplace Type</legend>
                <div className="workplace-type">
                  <label><input 
                          type="checkbox"
                          name="inPerson" 
                          onChange={workplaceTypeCheckboxChecker}
                          checked={workplaceType.inPerson}
                          /><span>In-person</span></label>
                  <label><input 
                          type="checkbox"
                          name="remote" 
                          onChange={workplaceTypeCheckboxChecker}
                          checked={workplaceType.remote}
                          /><span>Remote</span></label>
                  <label><input 
                          type="checkbox"
                          name="hybrid" 
                          onChange={workplaceTypeCheckboxChecker}
                          checked={workplaceType.hybrid}
                          /><span>Hybrid</span></label>
                </div>
              </fieldset>
            </div>

            <div className="jobsearch-btns">
              <button onClick={() => getAllFilters()}>Search</button>
              <button onClick={() => clearAllFilters()}>Reset</button>
            </div>

          </div>

          <img className="image-section" src={jobSearch} alt="job-search-image"/>

        </section>

        <section className="job-listings section-width">
          <h2>Current Openings</h2>
          <section>
            {jobPostings.map((jobPosting, index) => (
              <div className="job-card" key={`${jobPosting.title}-${jobPosting.company}-${index}`}>
                <h3>{jobPosting.title}</h3>
                <p className="company">{jobPosting.company}</p>
                <p className="location">{jobPosting.location}</p>
                <span className="badge">{jobPosting.type}</span>
                <span className="badge">{jobPosting.category}</span>
                <button className="apply-btn">Apply</button>
              </div>
            ))}
          </section>
        </section>

        <button className="load-more">Load More</button>
      </div>
      <FooterSection />
    </div>
  )
}

export default JobSearch;
