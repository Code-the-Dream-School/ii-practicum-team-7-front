import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8000/api/v1/jobs";

const fetchOptions = (method, data) => {
  const options = {
    method,
    credentials: "include",
  };

  if (data) {
    options.headers = {
      "Content-Type": "application/json",
    };
    options.body = JSON.stringify(data);
  }

  return options;
};

function JobPost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    summary: "",
    zipCode: "",
    city: "",
    state: "",
    description: "",
    employmentType: "Part-Time",
    workLocationType: "In-Person",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const maxSummaryLength = 250;
  const maxDescriptionLength = 1000;
  const remainingSummaryInput = maxSummaryLength - formData.summary.length;
  const remainingDescriptionInput =
    maxDescriptionLength - formData.description.length;

  const jobCategories = [
    "Babysitting",
    "Car Wash",
    "Cleaning",
    "Delivery",
    "Elder Care",
    "Electrical Work",
    "Event Help",
    "Food Service",
    "General Labor",
    "Junk Removal",
    "Landscaping",
    "Moving",
    "Painting",
    "Pet Care",
    "Plumbing",
    "Retail Helper",
    "Security",
    "Tutoring",
  ];

  //input change handler from form submission
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const dataToSend = {
        ...formData,
        zipCode: parseInt(formData.zipCode, 10),
      };

      const options = fetchOptions("POST", dataToSend);
      const response = await fetch(BASE_URL, options);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create job post");
      }

      const data = await response.json();
      navigate("/jobs");
    } catch (error) {
      setError(error.message);
      console.error("Error creating job:", error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Job Posting</h2>
      {error && <div className="error-message">Error: {error} </div>}

      <form onSubmit={handleSubmit} className="job-form">
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">
            Job Title <span className="required">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category">
            Category <span className="required">*</span>
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            list="categoryOptions"
            placeholder="Select or type a category"
            required
          />
          <datalist id="categoryOptions">
            {jobCategories.map((category) => (
              <option key={category} value={category} />
            ))}
          </datalist>
        </div>

        {/* Summary */}
        <div className="form-group">
          <label htmlFor="summary">
            Summary <span className="required">*</span>
          </label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleInputChange}
            maxLength={maxSummaryLength}
            required
          />
          <div className="character-counter">
            {remainingSummaryInput} characters remaining
          </div>
        </div>

        {/* Job Location Info */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="zipCode">
              ZIP code <span className="required">*</span>
            </label>
            <input
              type="number"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              min={10000}
              max={99999}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">
              City <span className="required">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="state">
              State <span className="required">*</span>
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Job Description */}
        <div className="form-group">
          <label htmlFor="description">
            Job Description <span className="required">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            maxLength={maxDescriptionLength}
          />
          <div className="character-counter">
            {remainingDescriptionInput} characters remaining
          </div>
        </div>

        {/* Employment Type */}
        <fieldset className="form-group">
          <legend>
            Employment Type <span className="required">*</span>
          </legend>
          <div className="radio-group">
            {["Full-Time", "Part-Time", "Contract"].map((type) => (
              <label key={type}>
                <input
                  type="radio"
                  name="employmentType"
                  value={type}
                  checked={formData.employmentType === type}
                  onChange={handleInputChange}
                  required
                />
                {type}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Work Location Type */}
        <fieldset className="form-group">
          <legend>
            Work Location Type <span className="required">*</span>
          </legend>
          <div className="radio-group">
            {["In-Person", "Remote", "Hybrid"].map((location) => (
              <label key={location}>
                <input
                  type="radio"
                  name="workLocationType"
                  value={location}
                  checked={formData.workLocationType === location}
                  onChange={handleInputChange}
                  required
                />
                {location}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate(-1)}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button type="submit" className="btn-submit" disabled={isSaving}>
            {isSaving ? "Creating..." : "Create Job"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default JobPost;
