import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    applicantName: "",
    resumeFile: null,
    coverLetterFile: null,
  });
  const [formError, setFormError] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | uploading | success | error

  //convert pdf to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handles the change of form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //for the files
  const maxSizeFile = 9.5 * 1024 * 1024;

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > maxSizeFile) {
        setFormError(
          `The file "${file.name}" is too big. Maximum size allowed is 9.5 MB.`
        );
        return;
      }
      setFormError("");
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
    }
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Aplicando al job con ID:", jobId);
    setFormError("");

    if (
      !formData.resumeFile ||
      !formData.coverLetterFile ||
      !formData.applicantName
    ) {
      setFormError("please complete all fields before submitting!!");
      return;
    }

    setIsSubmitting(true);
    setStatus("uploading");
    setUploadProgress(0);

    try {
      const resumeBase64 = await convertToBase64(formData.resumeFile);
      const coverLetterBase64 = await convertToBase64(formData.coverLetterFile);
      const submissionData = {
        applicantName: formData.applicantName,
        resumeUrl: resumeBase64,
        coverLetter: coverLetterBase64,
      };

      const response = await axios.post(
        `http://localhost:8000/api/v1/jobs/${jobId}/applications`,
        submissionData,
        {
          withCredentials: true,
          onUploadProgress: (ProgressEvent) => {
            const progress = ProgressEvent.total
              ? Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
              : 0;
            setUploadProgress(progress);
          },
        }
      );
      console.log("Response:", response);
      if (response.status !== 201) {
        throw new Error(response.data.message || "Failed to apply for job");
      }
      setStatus("success");
      alert("application sent successfully!");
      setTimeout(() => {
        navigate(`/jobs`);
      }, 1000);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError(
            "user must be logged in to apply for job.  Please log in and try again."
          );
        } else {
          setError(error.response.data?.message || "an error ocurred.");
        }
      } else {
        setError(
          "Hmm... something went wrong! Check your connection or try smaller files."
        );
      }
      setStatus("error");
      console.error("Error applying for job:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-32 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center text-ny-pink mb-4">
        Apply for Job
      </h2>
      <p className="text-sm text-gray-500 text-center mb-2">
        All fields marked with <span className="text-red-500">*</span> are
        required.
      </p>

      {formError && (
        <div className="text-red-500 mb-2 text-center">{formError}</div>
      )}
      {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label
            htmlFor="applicantName"
            className="block text-lg font-medium text-gray-700"
          >
            <span className="text-red-500">*</span>Your Name:
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
            htmlFor="resumeFile"
            className="block text-lg font-medium text-gray-700"
          >
            <span className="text-red-500">*</span> Resume (PDF):
          </label>
          <input
            type="file"
            id="resumeFile"
            name="resumeFile"
            accept=".pdf"
            onChange={handleFileChange}
            required
            disabled={isSubmitting}
          />
          <p className="text-xs text-gray-500 mt-1">
            Max file size: 9.5 MB. PDF only.
          </p>
        </div>
        <div className="form-group">
          <label
            htmlFor="coverLetterFile"
            className="block text-lg font-medium text-gray-700"
          >
            <span className="text-red-500">*</span> Cover Letter (PDF):
          </label>
          <input
            type="file"
            id="coverLetterFile"
            name="coverLetterFile"
            accept=".pdf"
            onChange={handleFileChange}
            required
            disabled={isSubmitting}
            className="w-full px-4 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-ny-pink"
          />
          <p className="text-xs text-gray-500 mt-1">
            Max file size: 9.5 MB. PDF only.
          </p>
        </div>
        {status === "uploading" && (
          <div className="space-y-2">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-2 bg-blue-600 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 text-center">
              {uploadProgress}% uploaded
            </p>
          </div>
        )}

        {status === "success" && (
          <p className="text-sm text-green-600 text-center">
            Files uploaded successfully!
          </p>
        )}

        {status === "error" && (
          <p className="text-sm text-red-600 text-center">
            Upload failed. Please try again.
          </p>
        )}
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
