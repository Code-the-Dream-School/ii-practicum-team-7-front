import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./userProfile.module.css";
import { useParams, useNavigate } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({}); //user save data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*show the data*/
  useEffect(() => {
    if (!id) {
      setError("User ID not found.");
      setLoading(false);
      return;
    }
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const url = `http://localhost:8000/api/v1/profile/${id}`;

        const data = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data.data);
        setLoading(false);
      } catch (error) {
        setError("Error to get the profile");
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [id]);
  if (loading) return <p>loading user profile ...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>No user data found.</p>;

  return (
    <div className={styles.profileContainer}>
      <h1>Mi profile</h1>
      <div className={styles.profileCard}>
        {user.profileImage && (
          <img
            src={user.image}
            alt="profile photo"
            className={styles.profileImage}
          />
        )}
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {user.phone || "No specified"}
        </p>
        <p>
          <strong>location:</strong> {user.address || "No specified"}
        </p>
        <p>
          <strong>Skills:</strong> {user.skills || "No specified"}
        </p>
        <p>
          <strong>Descriptión:</strong> {user.bio || "no description"}
        </p>
        <p>
          <strong>Rol:</strong> {user.role || "no rol specified"}
        </p>
      </div>
    </div>
  );
};

export default Profile;
