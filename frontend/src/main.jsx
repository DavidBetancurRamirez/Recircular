import './main.css';

import React from 'react';
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from './context/userContext';
import { LoadingContextProvider } from './context/loadingContext';
import { MessageContextProvider } from './context/messageContext';
import App from './App';
import Sesion from './components/Sesion';
import Agregar from './components/Agregar';
import Configuracion from './components/Configuracion';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    {/* Contextos */}
    <LoadingContextProvider>
      <MessageContextProvider>
        <UserContextProvider>

          {/* Ruteo */}
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<App />} />
              <Route path='/sesion' element={<Sesion />} />
              <Route path='/agregar' element={<Agregar />} />
              <Route path='/configuracion' element={<Configuracion />} />
            </Routes>
          </BrowserRouter>

        </UserContextProvider>
      </MessageContextProvider>
    </LoadingContextProvider>

  </React.StrictMode>
);