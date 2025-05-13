const JobSearchArea = (props) => {
  const { jobPhrase, setJobPhrase, category, setCategory, jobCategories, zipCode, setZipCode, radius, setRadius, radiusList, employmentType, employmentCheckboxChecker, workplaceType, workplaceTypeCheckboxChecker, getAllFilters, clearAllFilters, jobSearch } = props;

  return (
    <section className="bg-monte-carlo-dark pt-36 pb-12 px-4 sm:px-8 pg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Left Side */}
        <div className="lg:col-span-2 flex flex-col space-y-6">

          {/* Header */}
          <h2 className="lg:text-left text-center">Search Job Listings</h2>

          {/* Search Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Job Title */}
            <input 
            type="text"
            className="w-full border rounded p-1" 
            placeholder="Job title"
            value={jobPhrase}
            onChange={(e) => setJobPhrase(e.target.value)}
            />
            
            {/* Location */}
            <input
              type="text"
              className="w-full border rounded p-1" 
              placeholder="Enter location..."
              value={zipCode}
              inputMode="numeric"
              onChange={(e) => setZipCode(e.target.value)}
            />
            {/* Dropdowns */}
            <div className="flex gap-2">
              {/* Radius */}
              <select
                className="w-full md:w-1/2 border rounded p-1 cursor-pointer"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
              >
                <option value="">Search Radius</option>
                {radiusList.map((radius,index) =>
                <option value={radius} key={`${radius}-${index}`}>
                  {radius} {radius === 1 ? 'mile' : 'miles'}
                </option>
                )}
              </select>

              {/* Category */}
              <select 
                className="w-full md:w-1/2 border rounded p-1 cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Category</option>
                {jobCategories.map((jobCategory, index) => (
                  <option value={jobCategory.toLowerCase()} key={`${jobCategory}-${index}`}>
                    {jobCategory}
                  </option>
              ))}
              </select>
            </div>
          </div>

          {/* Job Type Header */}
          <h4 className="text-center lg:text-left">Job Type</h4>

          {/* Checkboxes */}
          <div className="grid grid-cols-1 gap-6">
            
            {/* Employment Type */}
            <fieldset>
              <legend className="sr-only">Employment Type</legend>
              <h5 className="mb-2 text-center lg:text-left underline">Employment Type</h5>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {["fullTime", "partTime", "contract"].map((type) => (
                  <label key={type} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name={type}
                      checked={employmentType[type]}
                      onChange={employmentCheckboxChecker}
                    />
                    <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Workplace Type */}
            <fieldset>
              <legend className="sr-only">Workplace Type</legend>            
              <h5 className="mb-2 text-center lg:text-left underline">Workplace Type</h5>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {["inPerson", "remote", "hybrid"].map((type) => (
                  <label key={type} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name={type}
                      checked={workplaceType[type]}
                      onChange={workplaceTypeCheckboxChecker}
                    />
                    <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          {/* Buttons Desktop */}
          <div className="lg:flex justify-end gap-4">
            <button onClick={() => clearAllFilters()} className="btn-grn">Reset</button>
            <button onClick={() => getAllFilters()} className="btn-blk">Search</button>
          </div>                        
        </div>

          {/* Image (hidden on mobile) */}
          <div className="hidden lg:flex items-start justify-end">
            <img className="max-w-xs object-cover mb-2 border-4 border-white" src={jobSearch} alt="job-search-image"/>
          </div>
      </div>
    </section>
  )
}
export default JobSearchArea;