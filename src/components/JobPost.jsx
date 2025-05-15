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
        let errorMessage = errorData.message || "Failed to create job post.";
        if (response.status === 401) {
          errorMessage = "Please log in to post job.";
        } else if (response.status === 400) {
          errorMessage =
            "Invalid data: " +
            (errorData.message || "Please check your inputs");
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      navigate("/jobs");
    } catch (error) {
      let errorMessage = error.message;
      if (
        error.name === "TypeError" &&
        error.message.includes("Failed to fetch")
      ) {
        errorMessage =
          "Unable to connect to the server. Please check your internet connection.";
      }
      setError(errorMessage);
      console.error("Error creating job:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-monte-carlo-dark pt-36 pb-12 px-4 sm:px-8 pg:px-16">
      <h2 className="mb-16">New Job Post</h2>

      <form
        onSubmit={handleSubmit}
        className="md:max-w-2xl max-w-md mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
      >
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="space-x-2">
            <span className="text-red-500">*</span>Job Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label htmlFor="category">
            <span className="text-red-500">*</span>Category:
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full border rounded p-2 cursor-pointer"
          >
            <option value="">Category</option>
            {jobCategories.map((jobCategory, index) => (
              <option
                value={jobCategory.toLowerCase()}
                key={`${jobCategory}-${index}`}
              >
                {jobCategory}
              </option>
            ))}
          </select>
        </div>

        {/* Summary */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="summary">
            <span className="text-red-500">*</span>Summary:
          </label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleInputChange}
            maxLength={maxSummaryLength}
            required
            className="w-full border rounded p-2"
          />
          <div className="text-gray-700 text-sm">
            {remainingSummaryInput} characters remaining
          </div>
        </div>

        {/* Job Description */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="description">
            <span className="text-red-500">*</span>Job Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            maxLength={maxDescriptionLength}
            className="w-full border rounded p-2"
          />
          <div className="text-gray-700 text-sm">
            {remainingDescriptionInput} characters remaining
          </div>
        </div>

        {/* Job Location Info */}
        <div className="md:col-span-2">
          <h5 className="mb-4">Job Location</h5>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="city">
                <span className="text-red-500">*</span>City:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full border rounded p-2"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="state">
                <span className="text-red-500">*</span>State:
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                className="w-full border rounded p-2"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="zipCode">
                <span className="text-red-500">*</span>ZIP code:
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]{5}"
                maxLength={5}
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
                className="w-full border rounded p-2"
              />
            </div>
          </div>
        </div>

        {/* Employment Type */}
        <div className="md:col-span-2 grid grid-cols-2 gap-6 text-left">
          <fieldset className="bg-white p-6 rounded-md shadow-md space-y-8 mb-4">
            <legend className="font-semibold float-left">
              <span className="text-red-500">*</span>Employment Type:
            </legend>
            <div className="pt-4 space-y-2">
              {["Full-Time", "Part-Time", "Contract"].map((type) => (
                <label key={type} className="flex space-x-2">
                  <input
                    type="radio"
                    name="employmentType"
                    value={type}
                    checked={formData.employmentType === type}
                    onChange={handleInputChange}
                    required
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Work Location Type */}
          <fieldset className="bg-white p-6 rounded-md shadow-md space-y-8 mb-4">
            <legend className="font-semibold float-left">
              <span className="text-red-500">*</span>Work Location Type:
            </legend>
            <div className="pt-4 space-y-2">
              {["In-Person", "Remote", "Hybrid"].map((location) => (
                <label key={location} className="flex space-x-2">
                  <input
                    type="radio"
                    name="workLocationType"
                    value={location}
                    checked={formData.workLocationType === location}
                    onChange={handleInputChange}
                    required
                  />
                  <span>{location}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Form Actions */}
        <div className="flex justify-center gap-2 md:col-span-2 mt-4">
          <button
            type="button"
            className="btn-wht"
            onClick={() => navigate(-1)}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button type="submit" className="btn-blk" disabled={isSaving}>
            {isSaving ? "Creating..." : "Create"}
          </button>

          {error && <div> ⚠️ Error: {error} </div>}
        </div>
      </form>
    </div>
  );
}

export default JobPost;
