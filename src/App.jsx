import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageWrapper from './PageWrapper';
import HeroSection from './components/HeroSection';  
import HowSection from './components/HowSection';  
import TestimonialSection from './components/TestimonialSection';  
import SignupSection from './components/SignupSection'; 
import './App.css';
import { getAllData } from './util/index';



const URL = 'http://localhost:8000/api/v1/';

function App() {
  
  const [message, setMessage] = useState(''); 
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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

      <BrowserRouter>
      <PageWrapper loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} user={user}>
        <Routes>
          <Route path="/" element={
            <>
              
              <HeroSection />
              <HowSection />
              <TestimonialSection />
              <SignupSection />
            </>
          } />
        </Routes>
      </PageWrapper>
    </BrowserRouter>

    </>
  );

}

export default App
