import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./userProfile.module.css";
import { useParams, useNavigate } from "react-router-dom";

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
  if (error) return <p>{error}</p>;
  if (!profile) return <p>No profile data found.</p>;

  return (
    <div className={styles.profileContainer}>
      <h1>My Profile</h1>
      <div className={styles.profileCard}>
        {profile.image && (
          <img
            src={profile.image}
            alt="profile photo"
            className={styles.profileImage}
          />
        )}
        <p>
          <strong>Name:</strong> {profile.name}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {profile.phone || "Not specified"}
        </p>
        <p>
          <strong>Location:</strong> {profile.address || "Not specified"}
        </p>
        <p>
          <strong>Skills:</strong> {profile.skills || "Not specified"}
        </p>
        <p>
          <strong>Description:</strong> {profile.bio || "No description"}
        </p>
        <p>
          <strong>Role:</strong> {profile.role || "Not specified"}
        </p>
      </div>

      {isOwner && (
        <button onClick={() => navigate(`/edit-profile/${profile._id}`)}>
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default Profile;
