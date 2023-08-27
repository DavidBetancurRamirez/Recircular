import './main.css';

import React from 'react';
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from './context/userContext';
import { LoadingContextProvider } from './context/loadingContext';
import Sesion from './components/Sesion';
import App from './App';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    {/* Contextos */}
    <LoadingContextProvider>
      <UserContextProvider>

        {/* Ruteo */}
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/sesion' element={<Sesion />} />
          </Routes>
        </BrowserRouter>

      </UserContextProvider>
    </LoadingContextProvider>

  </React.StrictMode>
);