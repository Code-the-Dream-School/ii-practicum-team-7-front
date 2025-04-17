import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageWrapper from './components/PageWrapper';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

import './App.css';
import { getAllData } from './util/index';



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
      <BrowserRouter>
        <PageWrapper>
          <Routes>
            <Route path='/login' element={<LoginForm />}
            />



            <Route path='/register' element={<RegisterForm />} />


          </Routes>
        </PageWrapper>
      </BrowserRouter>
    </>
  );

}

export default App
