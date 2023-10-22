import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import colores from "../styles/colores";
import LogoB from "../images/logo_blanco.png";
import Logo2 from "../images/logo2.png";
import Logo3 from "../images/logo3.png";
import UsuarioHeader from "./UsuarioHeader";
import BusquedaHeader from "./BusquedaHeader";
import Filtros from "./Filtros";

const Contenedor = styled.div`
    background-color: ${colores.azulClaro};
    height: 100px;
    width: 100vw;;
    padding: 5px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 1000px) { padding: 5px 10px; }

    @media (max-width: 800px) {
        flex-direction: column;
        height: auto;
        padding: 10px;
    }
`
const Botones = styled.div`
    height: 100%;
    display: flex;

    @media (max-width: 800px) {
        height: 25px;
        width: 100%;
        justify-content: space-between;
    }
`
const Logo = styled.img`
    height: 100%;
    cursor: pointer;
`


const Header = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const navigate = useNavigate();

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };
    const cambiarLogo = () => {
        if (windowWidth>=1000) return Logo2
        else if (windowWidth>800) return LogoB
        else return Logo3
    }
    useEffect(() => {
        // Agregar el evento de cambio de tamaño de ventana
        window.addEventListener('resize', handleResize);

        // Limpieza del efecto al desmontar el componente
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    
    return (
        <Contenedor>
            <Botones>
                <Logo src={cambiarLogo()} alt="Logo recircular" onClick={() => navigate("/")}  />
                {windowWidth<=800 && <UsuarioHeader /> }
            </Botones>
            <BusquedaHeader />
            {windowWidth>800 
            ? <UsuarioHeader />
            : <Filtros /> }
        </Contenedor>
    )
}

export default Header;