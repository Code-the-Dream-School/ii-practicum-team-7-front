import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    applicantName: "",
    resumeUrl: "",
    coverLetter: "",
  });
  const [formError, setFormError] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { jobId } = useParams();

  // Handles the change of form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Aplicando al job con ID:", jobId);
    setFormError("");

    if (
      !formData.resumeUrl ||
      !formData.coverLetter ||
      !formData.applicantName
    ) {
      setFormError("please complete all fields before submitting!!");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/jobs/${jobId}/applications`,
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("Response:", response);
      if (response.status !== 201) {
        throw new Error(response.data.message || "Failed to apply for job");
      }
      alert("application sent successfully!");
      navigate(`/jobs`);
    } catch (error) {
      setError(error.message);
      console.error("Error applying for job:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center text-ny-pink mb-4">
        Apply for Job
      </h2>
      {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label
            htmlFor="applicantName"
            className="block text-lg font-medium text-gray-700"
          >
            Your Name:
          </label>
          <input
            type="text"
            id="applicantName"
            name="applicantName"
            value={formData.applicantName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-ny-pink"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="resumeUrl"
            className="block text-lg font-medium text-gray-700"
          >
            Resume URL:
          </label>
          <input
            type="url"
            id="resumeUrl"
            name="resumeUrl"
            value={formData.resumeUrl}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-ny-pink"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="coverLetter"
            className="block text-lg font-medium text-gray-700"
          >
            Cover Letter:
          </label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-ny-pink"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-ny-pink text-white font-semibold rounded hover:bg-ny-pink-dark transition duration-300"
        >
          {isSubmitting ? "Applying..." : "Apply for Job"}
        </button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
