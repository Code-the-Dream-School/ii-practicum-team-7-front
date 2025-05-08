const JobSearchArea = (props) => {
  const { jobPhrase, setJobPhrase, category, setCategory, jobCategories, zipCode, setZipCode, radius, setRadius, radiusList, employmentType, employmentCheckboxChecker, workplaceType, workplaceTypeCheckboxChecker, getAllFilters, clearAllFilters, jobSearch } = props;

  return (
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
            ):(<option value={radius} key={`${radius}-${index}`}>{radius} miles</option>
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
  )
}
export default JobSearchArea;
