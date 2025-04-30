import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from "../images/logo1.png";
import jobSearch from "../images/jobsearch.jpg";
import FooterSection from  './landing/FooterSection.jsx';
import './JobSearch.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import zipcodes from 'zipcodes';


const JobSearch = () => {

  //an array of job categories
  const jobCategories = [
    "General Labor",
    "Cleaning",
    "Babysitting",
    "Elder Care",
    "Delivery",
    "Food Service",
    "Retail Helper",
    "Landscaping",
    "Moving",
    "Plumbing",
    "Electrical Work",
    "Painting",
    "Pet Care",
    "Tutoring",
    "Car Wash",
    "Security",
    "Event Help",
    "Junk Removal"
  ];

  //an array of radius
  const radiusList = [
    1, 5, 10, 15, 25, 50
  ]

  //job postings test samples no backend yet.
  const jobPostings = [
    // Within 5 miles
    {
      title: "Mover",
      category: "Moving",
      summary: "Help clients relocate locally.",
      zipcode: "10011",
      employmentType: "Full-time",
      workLocationType: "in-person"
    },
    {
      title: "Cleaner",
      category: "Cleaning",
      summary: "Apartment cleaning in Manhattan.",
      zipcode: "10018",
      employmentType: "Part-time",
      workLocationType: "in-person"
    },
    {
      title: "Dog Walker",
      category: "Pet Care",
      summary: "Daily dog walking route.",
      zipcode: "10003",
      employmentType: "Part-time",
      workLocationType: "in-person"
    },
    {
      title: "Lawn Mower",
      category: "Landscaping",
      summary: "Seasonal lawn care service.",
      zipcode: "10010",
      employmentType: "Contract",
      workLocationType: "hybrid"
    },
    {
      title: "Dishwasher",
      category: "Food Service",
      summary: "Back-of-house restaurant role.",
      zipcode: "10019",
      employmentType: "Full-time",
      workLocationType: "in-person"
    },
  
    // Within 10 miles
    {
      title: "Cashier",
      category: "Retail Helper",
      summary: "Convenience store help needed.",
      zipcode: "10451",
      employmentType: "Full-time",
      workLocationType: "in-person"
    },
    {
      title: "Waiter",
      category: "Food Service",
      summary: "Serve food in a busy diner.",
      zipcode: "11201",
      employmentType: "Part-time",
      workLocationType: "in-person"
    },
    {
      title: "Delivery Helper",
      category: "Delivery",
      summary: "Assist with last-mile deliveries.",
      zipcode: "11215",
      employmentType: "Full-time",
      workLocationType: "in-person"
    },
    {
      title: "Online Customer Support",
      category: "Customer Service",
      summary: "Respond to tickets and emails.",
      zipcode: "10452",
      employmentType: "Contract",
      workLocationType: "remote"
    },
    {
      title: "Remote Data Entry",
      category: "General Labor",
      summary: "Enter simple data from home.",
      zipcode: "11217",
      employmentType: "Part-time",
      workLocationType: "hybrid"
    },
  
    // Within 15 miles
    {
      title: "Babysitter",
      category: "Babysitting",
      summary: "Evening childcare help needed.",
      zipcode: "07030",
      employmentType: "Part-time",
      workLocationType: "in-person"
    },
    {
      title: "Elderly Companion",
      category: "Elder Care",
      summary: "Daytime elderly companionship.",
      zipcode: "07093",
      employmentType: "Part-time",
      workLocationType: "in-person"
    },
    {
      title: "Virtual Assistant",
      category: "General Labor",
      summary: "Remote scheduling and admin tasks.",
      zipcode: "07087",
      employmentType: "Contract",
      workLocationType: "remote"
    },
    {
      title: "Security Guard",
      category: "Security",
      summary: "Night shift at office building.",
      zipcode: "11373",
      employmentType: "Full-time",
      workLocationType: "hybrid"
    },
    {
      title: "Online Tutor",
      category: "Tutoring",
      summary: "Remote math tutoring.",
      zipcode: "11432",
      employmentType: "Part-time",
      workLocationType: "remote"
    },
  
    // Within 20 miles
    {
      title: "Retail Stocker",
      category: "Retail Helper",
      summary: "Restocking shelves at night.",
      zipcode: "11530",
      employmentType: "Part-time",
      workLocationType: "in-person"
    },
    {
      title: "Car Washer",
      category: "Car Wash",
      summary: "Exterior and interior detailing.",
      zipcode: "11501",
      employmentType: "Contract",
      workLocationType: "in-person"
    },
    {
      title: "Tutor",
      category: "Tutoring",
      summary: "Help students with homework.",
      zipcode: "07024",
      employmentType: "Part-time",
      workLocationType: "hybrid"
    },
    {
      title: "Event Helper",
      category: "Event Help",
      summary: "Assist with setup/teardown.",
      zipcode: "07020",
      employmentType: "Contract",
      workLocationType: "in-person"
    },
    {
      title: "Remote Dispatcher",
      category: "Logistics",
      summary: "Coordinate drivers and shipments.",
      zipcode: "11550",
      employmentType: "Full-time",
      workLocationType: "remote"
    }
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

  const [currentPage, setCurrentPage] = useState(1);const jobsPerPage = 5;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobPostings.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobPostings.length / jobsPerPage);

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
            {currentJobs.map((jobPosting, index) => (
              <div className="job-card" key={`${jobPosting.title}-${index}`}>
                <h3>{jobPosting.title}</h3> 
                <span className="category">{jobPosting.category}</span>
                <p className="company">{jobPosting.summary}</p>
                <p className="location">
                <FontAwesomeIcon icon={faLocationDot} style={{ color: "#000000" }} size="lg"/>
                  {jobPosting.zipcode} <span><FontAwesomeIcon icon={faClock} size="lg" /> {jobPosting.employmentType}</span></p>
                
                <span className="badge">{jobPosting.workLocationType}</span>
                <button className="apply-btn">Apply</button>
              </div>
            ))}
          </section>
        </section>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button 
              key={i + 1} 
              onClick={() => setCurrentPage(i + 1)} 
              className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <FooterSection />
    </div>
  )
}

export default JobSearch;
