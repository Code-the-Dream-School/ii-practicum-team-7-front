import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const GOOGLE_OAUTH_URL = "http://localhost:8000/api/v1/auth/google";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ← send/receive HTTP-only cookies
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Failed to log in");

      // localStorage.setItem("authToken", result.token);
      // localStorage.setItem("userId", result.user.userId);

      //navigate(`/profile/${result.user._id}`);
      navigate("/");
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
      {/* Login Form */}
      <div className="bg-monte-carlo pt-52 pb-12 px-16">
        <div className="section-content">
          <form onSubmit={handleSubmit} className="space-y-6">
            <p>Welcome back!</p>
            <h2>Sign in</h2>
            <p>Please enter your email and password to sign in</p>

            {/* Form Sections */}
            <div className="flex flex-col w-full space-y-4">

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
            </div>

            {/* Buttons */}
            <div className="flex flex-col items-center space-y-4">
              <button type="submit" disabled={loading} className="btn-blk">
                {loading ? "Signing you in..." : "Sign in"}
              </button>

              <p>— or —</p>

              <button type="button" onClick={handleGoogleSignIn} className="flex flex-col items-center">
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google logo"
                  className="rounded-full w-12 h-12 mb-4"
                />
                Sign in with Google
              </button>

              {error && <p>{error}</p>}
            </div>
          </form>
        </div>
      </div>

      {/* Register */}
      <div className="section-container bg-ny-pink-md text-white">
        <div className="section-content">
          <h3>Don't have an account yet?</h3>
          <p>Register to get started</p>
          <Link to="/register">
            <button className="btn-grn">Register</button>
          </Link>
          </div>
        </div>
    </>
  );
}

export default LoginForm;
