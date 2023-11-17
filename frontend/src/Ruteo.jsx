import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useUser } from "../context/userContext"

import App from './components/App';
import Sesion from './components/Sesion';
import Agregar from './components/Agregar';
import Producto from './components/Producto';
import Perfil from './components/Perfil';

const Ruteo = () => {
    useEffect(() => {
        const savedUserData = localStorage.getItem('userData');
        if (savedUserData) {
          localStorage.setItem('userData', savedUserData);
        }
      }, []);

    

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/sesion' element={<Sesion />} />
                <Route path='/agregar' element={<Agregar />} />
                <Route path='/producto' element={<Producto />} component={Producto} />
                <Route path='/perfil' element={<Perfil/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Ruteo;