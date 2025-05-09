import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const JobPostings = (props) => {
  const { currentJobs } = props;
  return (
    <section className="job-listings section-width">
      <h2>Current Openings</h2>
      <div>
        {currentJobs.length === 0 && (
          <h3 style={{ color: "red" }}>No Jobs Found</h3>
        )}
        {currentJobs.map((jobPosting, index) => (
          <div className="job-card" key={`${jobPosting.title}-${index}`}>
            <h3>{jobPosting.title}</h3>
            <span className="category">{jobPosting.category}</span>
            <p className="company">{jobPosting.summary}</p>
            <p className="location">
              <FontAwesomeIcon
                icon={faLocationDot}
                style={{ color: "#000000" }}
                size="lg"
              />
              {jobPosting.distance} miles away{" "}
              <span>
                <FontAwesomeIcon icon={faClock} size="lg" />{" "}
                {jobPosting.employmentType}
              </span>
            </p>

            <span className="badge">{jobPosting.workLocationType}</span>
            <Link to={`/jobs/${jobPosting._id}/apply`} className="apply-btn">
              Apply
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JobPostings;
