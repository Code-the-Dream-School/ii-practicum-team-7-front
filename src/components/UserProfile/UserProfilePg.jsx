import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./userProfile.module.css";
import NavBar from "../../../NavBar";
import { use } from "react";

const url = "http://localhost:8000/api/v1/profile"; // endpoint FALTAAAA

const Profile = () => {
  const [user, setUser] = useState({}); //user save datos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*show the data*/
  /* useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Usamos token para la autorización
          },
        });

        setUser(data);
        setLoading(false);
      } catch (error) {
        setError("Error to get the profile");
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  if (loading) return <p>loading user profile ...</p>;
  if (error) return <p>{error}</p>;*/

  useEffect(() => {
    setTimeout(() => {
      const mockUserData = {
        name: "Anamaria Maldonado",
        email: "anamaria@gmail.com",
        phone: "123456789",
        location: "Durham, NC",
        skills: "React, Node.js, Express",
        description: "Frontend Developer with passion for user interfaces.",
        rol: "admin",
        profileImage:
          "https://scontent-iad3-1.xx.fbcdn.net/v/t1.18169-9/10309198_314184682088585_6181496952163926251_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7f8c78&_nc_ohc=WRarUAZRbuoAX8l8r38&_nc_ht=scontent-iad3-1.xx&oh=00_AfDn9wCvefwY6c_ZzXSPK-ceZA0_FlxY9xuD2eILtJbDLg&oe=65C4F3AE",
      };
      setUser(mockUserData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <p>loading user profile...</p>;
  }

  return (
    <div className={styles.profileContainer}>
      <NavBar />
      <h1>Mi profile</h1>
      <div className={styles.profileCard}>
        {user.profileImage && (
          <img
            src={user.profileImage}
            alt="perfil photo"
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
          <strong>location:</strong> {user.location || "No specified"}
        </p>
        <p>
          <strong>Skills:</strong> {user.skills || "No specified"}
        </p>
        <p>
          <strong>Descriptión:</strong> {user.description || "no description"}
        </p>
        <p>
          <strong>Rol:</strong> {user.rol || "no rol specified"}
        </p>
      </div>
    </div>
  );
};

export default Profile;
