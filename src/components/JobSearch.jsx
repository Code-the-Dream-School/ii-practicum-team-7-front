import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from "../images/logo1.png";
import jobSearch from "../images/jobsearch.jpg";
import FooterSection from  './landing/FooterSection.jsx';
import './JobSearch.css';
import zipcodes from 'zipcodes';
import Pagination from "./jobsearch/Pagination.jsx";
import JobPostings from "./jobsearch/JobPostings.jsx";
import JobSearchArea from "./jobsearch/JobSearchArea.jsx";


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
  const [ zipCode, setZipCode ] = useState("10001");
  const [ radius, setRadius ] = useState("5");
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

  //Added distance between the posting's zip code and the default zip code.
  const [ filteredPostings, setFilteredPostings ] = useState(() => {
    return jobPostings.map(posting => ({
      ...posting,
      distance : zipcodes.distance(zipCode, posting.zipcode)
    }))
      .sort((postingA, postingB) => postingA.distance - postingB.distance);
  });

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredPostings.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredPostings.length / jobsPerPage);

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

  //Function that will filter the job listing based on the phrases and set filters
  const getAllFilters = () => {
    console.log(`This is the job phrase: ${jobPhrase}`);
    console.log(`This is the category: ${category}`);

    console.log(`This is the zip code: ${zipCode}`);
    console.log(`This is radius: ${radius}`);
    
    console.log(`This is the employment type: full-time: ${employmentType.fullTime}, part-time: ${employmentType.partTime}, contract: ${employmentType.contract}`);
    console.log(`This is the workplace type: in-person: ${workplaceType.inPerson}, remote: ${workplaceType.remote}, hybrid: ${workplaceType.hybrid}`);

    const filtered = jobPostings
    .map(posting => ({
      ...posting,
      distance: zipcodes.distance(zipCode, posting.zipcode)
    }))
    .filter(posting => {
      const matchesPhrase = jobPhrase
        ? posting.title.toLowerCase().includes(jobPhrase.toLowerCase())
        : true;

      const matchesCategory = category
        ? posting.category.toLowerCase() === category
        : true;

      const withinRadius = radius
        ? posting.distance <= Number(radius)
        : true;

      const matchesEmployment =
        (!employmentType.fullTime && !employmentType.partTime && !employmentType.contract) ||
        (employmentType.fullTime && posting.employmentType.toLowerCase() === "full-time") ||
        (employmentType.partTime && posting.employmentType.toLowerCase() === "part-time") ||
        (employmentType.contract && posting.employmentType.toLowerCase() === "contract");

      const matchesWorkplace =
        (!workplaceType.inPerson && !workplaceType.remote && !workplaceType.hybrid) ||
        (workplaceType.inPerson && posting.workLocationType === "in-person") ||
        (workplaceType.remote && posting.workLocationType === "remote") ||
        (workplaceType.hybrid && posting.workLocationType === "hybrid");

      return matchesPhrase && matchesCategory && withinRadius && matchesEmployment && matchesWorkplace;
    })
    .sort((a, b) => a.distance - b.distance);

    setFilteredPostings(filtered);
    setCurrentPage(1); // reset to first page after filtering
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

        <JobSearchArea 
          jobPhrase={jobPhrase}
          setJobPhrase={setJobPhrase}
          category={category}
          setCategory={setCategory}
          jobCategories={jobCategories}
          zipCode={zipCode}
          setZipCode={setZipCode}
          radius={radius}
          setRadius={setRadius}
          radiusList={radiusList}
          employmentType={employmentType}
          employmentCheckboxChecker={employmentCheckboxChecker}
          workplaceType={workplaceType}
          workplaceTypeCheckboxChecker={workplaceTypeCheckboxChecker}
          getAllFilters={getAllFilters}
          clearAllFilters={clearAllFilters}
          jobSearch={jobSearch}
        />

        <JobPostings 
          currentJobs = {currentJobs}
        />

        <Pagination 
          totalPages={totalPages} 
          setCurrentPage={setCurrentPage} 
          currentPage={currentPage}
          />
          
      </div>
      <FooterSection />
    </div>
  )
}

export default JobSearch;
