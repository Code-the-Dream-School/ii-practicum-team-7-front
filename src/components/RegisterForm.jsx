import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const GOOGLE_OAUTH_URL = "http://localhost:8000/api/v1/auth/google";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmpassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Failed to register");

      // localStorage.setItem("authToken", result.token);

      navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // simply redirect browser to backend OAuth entrypoint
    window.location.href = GOOGLE_OAUTH_URL;
  };

  return (
    <>
      {/* Register Form */}
      <div className="bg-monte-carlo pt-36 pb-12 px-16">
        <div className="section-content">
          <form onSubmit={handleSubmit} className="space-y-6">
            <p>Nice to meet you, neighbor!</p>
            <h2>Register</h2>
            <p>Join the community and connect with local jobs and talent</p>

            {/* Form Sections */}
            <div className="flex flex-col w-full space-y-2">

              {/* Name */}
              <div className="text-left">
                <label htmlFor="name" className="my-2 block">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-b-gray-500 bg-inherit"
                />
              </div>

              {/* Email */}
              <div className="text-left">
                <label htmlFor="email" className="my-2 block">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-b-gray-500 bg-inherit"
                />
              </div>

              {/* Password */}
              <div className="text-left">
                <label htmlFor="password" className="my-2 block">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-b-gray-500 bg-inherit"
                />
              </div>
            
              {/* Confirm Password */}
              <div className="text-left">
                <label htmlFor="password" className="my-2 block">Password</label>
                <input
                  type="password"
                  name="confirmpassword"
                  placeholder="Confirm Password"
                  value={formData.confirmpassword}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-b-gray-500 bg-inherit"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col items-center space-y-2">
              <button type="submit" disabled={loading} className="btn-blk">
                {loading ? "Registering..." : "Register"}
              </button>

              <p>— or —</p>

              <button type="button" onClick={handleGoogleSignIn} className="flex flex-col items-center">
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google logo"
                  className="rounded-full w-12 h-12 mb-2"
                />
                Sign in with Google
              </button>

              {error && <p>{error}</p>}
            </div>
          </form>
        </div>
      </div>

      {/* Login */}
      <div className="section-container bg-ny-pink-md text-white">
        <div className="section-content">
          <h3>Already have an account?</h3>
          <Link to="/login">
            <button className="btn-grn">Login</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
