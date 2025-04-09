import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
        <header>
          {/*Nav goes here */}
        </header>

        <main>
          <Routes>
            {/*layout/hompage can go here */}
            <Route path='/' element={<h1>{message}</h1>}/>
            {/*more routes added below */}
          </Routes>
        </main>

        <footer>
          {/*Footer component here */}
        </footer>
      </BrowserRouter>
      
    </>
  );

}

export default App
