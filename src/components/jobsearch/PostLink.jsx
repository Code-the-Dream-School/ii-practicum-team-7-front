import { Link } from "react-router-dom";

function PostLink() {
    return (
        <div className="bg-ny-pink text-white pt-8 space-y-4">
            <h4>Want to post a job instead?</h4>
            <button className="btn-grn">
                <Link to="/create-job">Post a Job</Link>
            </button>
        </div>
    );
}

export default PostLink;