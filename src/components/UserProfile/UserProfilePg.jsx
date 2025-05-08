import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null); // Get user Id from backend response instead

  // const loggedInUserId = localStorage.getItem("userId");

  //To fetch current user.
  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/auth/current-user",
        { withCredentials: true }
      );
      setCurrentUserId(data.userId);
    } catch (error) {
      console.log("Error fetch current user,", error.message);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // Only check isOwner if profile exists
  const isOwner = profile && profile.createdBy === currentUserId;

  useEffect(() => {
    if (!id) {
      setError("Profile not found.");
      setLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        // const token = localStorage.getItem("authToken");
        const url = `http://localhost:8000/api/v1/profile/${id}`;

        const { data } = await axios.get(url, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
          withCredentials: true, // send cookies automatically
        });
        setProfile(data.profile); // assuming `data.data` contains the profile
        console.log("Fetched profile:", data.profile);
      } catch (error) {
        setError("Error fetching the profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  if (loading) return <p>Loading user profile...</p>;
  if (error) return <><p>{error}</p><Link to="/create-profile">Create profile</Link><Link to="/edit-profile/:id">Create profile</Link></>;
  if (!profile) return <p>No profile data found.</p>;

  const roleLabels = {
  jobSeeker: "Job Seeker",
  hiring: "Hiring",
  both: "Job Seeker & Hiring",
  };

  return (
    <div className="bg-monte-carlo pt-36 pb-12 px-4 sm:px-8 pg:px-16">
      <Link to="/create-profile">Create profile</Link>
      <Link to="/edit-profile/:id">Create profile</Link>
      <h1>My Profile</h1>

      {/* Profile Photo + Role */}
      <div className="flex flex-col items-center my-6">
        {profile.image && (
          <img
            src={profile.image}
            alt="profile photo"
            className="w-52 h-52 rounded-full object-cover mb-2 border-4 border-white"
          />
        )}
        <p className="text-white bg-ny-pink py-2 px-4 rounded-md text-lg">
          <span className="font-bold">Role:</span> {roleLabels[profile.role] || "Not specified"}
        </p>
      </div>

      {/* Info */}
      <div className="bg-white p-6 rounded-md shadow-md max-w-2xl mx-auto space-y-8 my-6">
        {profile.name && (
          <p>
            <span className="font-bold">Name:</span>{" "}
            <span className="text-gray">{profile.name}</span>
          </p>
        )}
        {profile.email && (
          <p>
            <span className="font-bold">Email:</span>{" "}
            <span className="text-gray">{profile.email}</span>
          </p>
        )}
        {profile.phone && (
          <p>
            <span className="font-bold">Phone:</span>{" "}
            <span className="text-gray">{profile.phone}</span>
          </p>
        )}
        {profile.address && (
          <p>
            <span className="font-bold">Location:</span>{" "}
            <span className="text-gray">{profile.address}</span>
          </p>
        )}
        {profile.skills && (
          <p>
            <span className="font-bold">Skills:</span>{" "}
            <span className="text-gray">{profile.skills}</span>
          </p>
        )}
        {profile.bio && (
          <p>
            <p className="font-bold">Description:</p>{" "}
            <p className="text-gray">{profile.bio}</p>
          </p>
        )}
      </div>

      {isOwner && (
        <button onClick={() => navigate(`/edit-profile/${profile._id}`)} className="btn-blk">
          Edit
        </button>
      )}
    </div>
  );
};

export default Profile;
