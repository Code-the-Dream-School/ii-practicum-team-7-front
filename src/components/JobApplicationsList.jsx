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
        // const token = localStorage.getItem("authToken");// estamos usando cookies no necesitamos guardar aqui
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/v1/jobs/${jobId}/applications`, // me sale undefiend, tengo que esperar a el create job
          {
            // headers: {
            //   Authorization: `Bearer ${token}`,
            // },
            withCredentials: true, // estamos usando cookies no necesitamos guardar OJO
          }
        );
        setApplications(response.data.data); //tengo que checar
      } catch (error) {
        setError("Error fetching applications.");
        console.error("Error fetching applications:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplications();
  }, [jobId]);

  return (
    <div className="applications-container">
      <h2 className="text-2xl font-semibold">Job Applications</h2>
      {isLoading && <p>Loading...</p>}
      {error && <div className="text-red-500">{error}</div>}
      {applications.length === 0 && !isLoading ? (
        <p>No applications yet.</p>
      ) : (
        <ul className="space-y-4 mt-4">
          {applications.map((application) => (
            <li key={application._id} className="border p-4 rounded shadow">
              <h3 className="text-xl font-semibold">
                {application.applicantName}
              </h3>
              <p className="mt-2">
                Resume:
                <a
                  href={application.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  View Resume
                </a>
              </p>
              <p className="mt-2">Cover Letter: {application.coverLetter}</p>
              <p className="mt-2">
                Applied on:
                {new Date(application.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobApplicationsList;
