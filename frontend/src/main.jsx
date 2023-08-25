import React from 'react'
import ReactDOM from 'react-dom/client'
import { Helmet } from 'react-helmet';
import Logo from "./images/logo_azul.png"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sesion from './components/Sesion';

import './main.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Helmet>
      <link rel="icon" type="image/png" href={Logo} />
    </Helmet>

    <BrowserRouter>
      <Routes>
        <Route path='sesion' element={<Sesion />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);