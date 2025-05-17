import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const JobPostings = (props) => {

  const daysSince = (createdDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const created = new Date(createdDate);
    const now = new Date();
    const diffDays = Math.round(Math.abs((now - created) / oneDay));
    return `posted ${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }

  const { currentJobs } = props;
  return (
    <section className="pt-28 pb-12 px-4 sm:px-8 pg:px-16 bg-ny-pink-light">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <h2 className="lg:text-left text-center">Current Openings</h2>
        <div className="text-center mx-auto md:text-left md:mx-0">
          {currentJobs.length === 0 && <h5>No Jobs Found</h5>}
          {currentJobs.map((jobPosting, index) => (
            <div
              key={`${jobPosting.title}-${index}`}
              className="py-6 border-t border-gray-400 text-left space-y-4"
            >
              <div className="flex flex-wrap items-center gap-6">
                <h4>{jobPosting.title}</h4>
                <span className="text-black bg-[#E9D8DA] py-1.5 px-3 border border-gray-400 min-w-[70px]">
                  {jobPosting.category}
                </span>
              </div>
              <p>{jobPosting.summary}</p>
              <div className="flex flex-wrap items-center gap-4">
                <p className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faLocationDot} size="lg" />
                  {jobPosting.distance} miles away
                </p>
                <span className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faClock} size="lg" />
                  {jobPosting.employmentType}
                </span>
                <span>{jobPosting.workLocationType}</span>
                <span>{daysSince(jobPosting.createdDate)}</span>
              </div>
              <button className="btn-lt-pnk">Apply</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobPostings;
