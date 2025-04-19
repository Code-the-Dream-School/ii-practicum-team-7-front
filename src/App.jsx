import React, { useState, useEffect } from "react";
import { getAllData } from "./util/index";
import Profile from "./components/UserProfile/UserProfilePg";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const URL = "http://localhost:8000/api/v1/";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const myData = await getAllData(URL);
      setMessage(myData.data);
    })();

    return () => {
      console.log("unmounting");
    };
  }, []);

  return (
    <>
      <h1>{message}</h1>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />{" "}
          <Route path="/register" element={<RegisterForm />} />{" "}
          <Route path="/profile/:id" element={<Profile />} />{" "}
        </Routes>
      </Router>
    </>
  );
}

export default App;
