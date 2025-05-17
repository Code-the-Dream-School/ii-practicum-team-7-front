import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import logo from "../images/logo1.png";
import jobSearch from "../images/jobsearch.jpg";
import zipcodes from 'zipcodes';
import Pagination from "./jobsearch/Pagination.jsx";
import JobPostings from "./jobsearch/JobPostings.jsx";
import JobSearchArea from "./jobsearch/JobSearchArea.jsx";
import axios from "axios";

const JobSearch = () => {
  const [ jobPostings, setJobPostings ] = useState([]);
  const [ jobPhrase, setJobPhrase ] = useState("");
  const [ zipCode, setZipCode ] = useState("10001");
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
  const [ filteredPostings, setFilteredPostings ] = useState([]);

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

  //Function that clears all the search phrases and filters except the zip code.
  const clearAllFilters = () => {
    setJobPhrase("");
    setRadius("")
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

    //check if zip code is legitimate
      //the lookup function will not return null if the zip code is valid
    if(zipcodes.lookup(zipCode)) {
      const filtered = jobPostings
        .map(posting => ({
          ...posting,
          distance: zipcodes.distance(zipCode, posting.zipCode)
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
            (workplaceType.inPerson && posting.workLocationType.toLowerCase() === "in-person") ||
            (workplaceType.remote && posting.workLocationType.toLowerCase() === "remote") ||
            (workplaceType.hybrid && posting.workLocationType.toLowerCase() === "hybrid");

          return matchesPhrase && matchesCategory && withinRadius && matchesEmployment && matchesWorkplace;
        })
        .sort((a, b) => a.distance - b.distance);
      setFilteredPostings(filtered);
      setCurrentPage(1); // reset to first page after filtering
    } else {
      alert("Invalid zip code.  Try again!");
    }    
  } 
    
  //To fetch jobs
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/jobs",
        { withCredentials: true }
      );
      setJobPostings(data.jobs);
    } catch (error) {
      console.log("Error fetch jobs,", error.message);
    }
  };
  
  //fetch jobs from the backend on the first load.
  useEffect(() => {
    fetchJobs();
  }, []);

  //to add distance once the jobPostings gets the update from the backend.
  useEffect(() => {
    if (jobPostings.length === 0) return;

    //Added distance between the posting's zip code and the default zip code.
      //then sort by created date from the newest to oldest   
    const filtered = jobPostings.map(posting => ({
      ...posting,
      distance: zipcodes.distance(zipCode, posting.zipCode)
    }))
    .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
  
    setFilteredPostings(filtered);
  }, [jobPostings]);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredPostings.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredPostings.length / jobsPerPage);

  return (
    <div>
      <div>

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
    </div>
  )
}

export default JobSearch;
