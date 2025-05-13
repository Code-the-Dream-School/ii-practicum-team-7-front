import Profile from "./components/UserProfile/UserProfilePg.jsx";
import ReviewPage from "./components/ReviewPage.jsx"; 
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageWrapper from './components/PageWrapper';
import { getAllData } from './util/index';
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import Navbar from './components/landing/Navbar.jsx';
import HeroSection from './components/landing/HeroSection.jsx';
import HowSection from './components/landing/HowSection.jsx';
import TestimonialSection from './components/landing/TestimonialSection.jsx';
import SignUpSection from './components/landing/SignUpSection.jsx';
import FooterSection from './components/landing/FooterSection.jsx';
import JobSearch from './components/JobSearch.jsx';
import UserInfoForm from "./components/UserProfile/UserInfoForm.jsx";
import JobPost from "./components/JobPost.jsx";

const URL = 'http://localhost:8000/api/v1/';

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
    <BrowserRouter>
      <PageWrapper>
        <Routes>
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path="/jobs" element={<JobSearch />} />
          <Route path="/create-job" element={<JobPost />} />
          <Route path="/" element={
            <main>
              <HeroSection />
              <HowSection />
              <TestimonialSection />
              <ReviewPage /> 
              <SignUpSection />
            </main>
          } />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/create-profile" element={<UserInfoForm />} />
          <Route path="/edit-profile/:id" element={<UserInfoForm />} />
        </Routes>
      </PageWrapper>
    </BrowserRouter>
  );
}

export default App;
