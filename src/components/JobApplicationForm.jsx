import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    resumeUrl: "",
    coverLetter: "",
  });
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
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No authentication token found.");
        return;
      }
      const response = await axios.post(
        `http://localhost:8000/api/v1/jobs/${jobId}/applications`, // sale undefiend tengo que esperar a que se create job para testear
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(response.data.message || "Failed to apply for job");
      }

      navigate(`/jobs/${jobId}`);
    } catch (error) {
      setError(error.message);
      console.error("Error applying for job:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="text-2xl font-semibold">Apply for Job</h2>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div className="form-group">
          <label htmlFor="resumeUrl" className="block text-lg">
            Resume URL:
          </label>
          <input
            type="url"
            id="resumeUrl"
            name="resumeUrl"
            value={formData.resumeUrl}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <div className="form-group">
          <label htmlFor="coverLetter" className="block text-lg">
            Cover Letter:
          </label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-blue-600 text-white rounded"
        >
          {isSubmitting ? "Applying..." : "Apply for Job"}
        </button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
