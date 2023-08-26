import './main.css';

import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sesion from './components/Sesion';
import App from './App';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/sesion' element={<Sesion />} />
    </Routes>
  </BrowserRouter>
);