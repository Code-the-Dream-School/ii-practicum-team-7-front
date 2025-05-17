import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const JobApplicationsList = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const { jobId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching applications for jobId:", jobId);
        const response = await axios.get(
          `http://localhost:8000/api/v1/jobs/${jobId}/applications`,
          {
            withCredentials: true,
          }
        );
        console.log("API response", response.data);
        if (response.data && Array.isArray(response.data)) {
          setApplications(response.data);
        } else {
          setApplications([]);
        }
      } catch (error) {
        setError("Error fetching applications.");
        console.error("Error fetching applications:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplications();
  }, [jobId]);

  // convert base64 to Blob
  const base64ToBlob = (base64Data, contentType = "application/pdf") => {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length)
      .fill()
      .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  };

  return (
    <div className="pt-48 bg-monte-carlo-dark">
      <h2 className="mb-16">
        Job Applications
      </h2>
      {isLoading && <p>Loading...</p>}
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      {applications.length === 0 && !isLoading ? (
        <p className="text-center">No applications yet.</p>
      ) : (
        <ul className="max-w-4xl mx-auto bg-white shadow-md rounded-md w-2/3">
          {applications.map((application, index) => (
            <li
              key={
                application._id ||
                `${application.applicantName}-${application.createdAt}-${index}`
              }
              className="border p-4 rounded shadow-md hover:shadow-lg transition duration-200"
            >
              <h3 className="text-xl font-semibold">
                {application.applicantName}
              </h3>
              <div className="pt-2">
                <p>
                  Resume:
                  <button
                    onClick={() => {
                      const blob = base64ToBlob(
                        application.resumeUrl.split(",")[1]
                      );
                      const url = URL.createObjectURL(blob);
                      window.open(url, "_blank");
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    View Resume
                  </button>
                </p>
              </div>
              <div className="mt-2">
                <p>
                  Cover Letter:
                  <button
                    onClick={() => {
                      const blob = base64ToBlob(
                        application.coverLetter.split(",")[1]
                      );
                      const url = URL.createObjectURL(blob);
                      window.open(url, "_blank");
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    View Cover Letter
                  </button>
                </p>
              </div>

              <div className="pt-2">
                <p>
                  Applied on:
                  {new Date(application.createdAt).toLocaleDateString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobApplicationsList;
