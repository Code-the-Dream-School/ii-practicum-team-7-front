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
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging In..." : "Log In"}
        </button>
        {error && <p>{error}</p>}
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
      <p>—or—</p>
      <button type="button" onClick={handleGoogleSignIn}>
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google logo"
          style={{ width: "20px", marginRight: "8px" }}
        />
        Sign in with Google
      </button>
    </>
  );
}

export default LoginForm;
