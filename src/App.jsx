import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import Navbar from './components/landing/Navbar.jsx';
import HeroSection from './components/landing/HeroSection.jsx';
import HowSection from './components/landing/HowSection.jsx';
import TestimonialSection from './components/landing/TestimonialSection.jsx';
import SignUpSection from  './components/landing/SignUpSection.jsx';
import FooterSection from  './components/landing/FooterSection.jsx';

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
    <>
      {/* <h1>{message}</h1> */}
      <Navbar />
      <HeroSection />
      <HowSection />
      <TestimonialSection />
      <SignUpSection />
      <FooterSection />
    </>
  );

}

export default App
