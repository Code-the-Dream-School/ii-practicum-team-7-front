import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PageWrapper from './components/PageWrapper';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

import './App.css';

import { getAllData } from './util/index';
import Navbar from './components/landing/Navbar.jsx';
import HeroSection from './components/landing/HeroSection.jsx';
import HowSection from './components/landing/HowSection.jsx';
import TestimonialSection from './components/landing/TestimonialSection.jsx';
import SignUpSection from  './components/landing/SignUpSection.jsx';
import FooterSection from  './components/landing/FooterSection.jsx';
import JobSearch from './components/JobSearch.jsx';
import './App.css';



const URL = 'http://localhost:8000/api/v1/';

function App() {


  const [message, setMessage] = useState(''); 


  useEffect(() => {

    (async () => {
      const myData = await getAllData(URL)
      setMessage(myData.data);
    })();

    return () => {
      console.log('unmounting');
    }

  }, []);

  return (

    <BrowserRouter>
    <PageWrapper>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path="/jobs" element={<JobSearch />} />
        <Route path="/" element={
          <main>
            <HeroSection />
            <HowSection />
            <TestimonialSection />
            <SignUpSection />
          </main>
        } />
      </Routes>
      </PageWrapper>
    </BrowserRouter>

  );
}
export default App
