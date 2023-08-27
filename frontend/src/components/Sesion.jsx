import { useState } from "react";
import HeaderSesion from "../elements/HeaderSesion";
import ContentSesion from "../elements/ContentSesion";

import styled from "styled-components";
import Imagen from "../images/fondo-sesion.jpg"

const Fondo = styled.div`
    background-image: url(${Imagen});
    background-size: cover;
    background-position: center center;
    background-attachment: fixed;
    width: 100vw;
    height: 100vh;
    padding: 80px;

    @media (max-width: 700px) {
        padding: 30px;
    }
`;
const Contenedor = styled.div`
    margin: auto;
    max-width: 1000px;
    width: 100%;
`;

const Sesion = () => {
    // Para saber en que pestaña se encuentra el usuario
    const [inLogin, cambiarInLogin] = useState(true);
    
    return (
        <Fondo>
            <Contenedor>
                <HeaderSesion inLogin={inLogin} cambiarInLogin={cambiarInLogin} />
                <ContentSesion inLogin={inLogin} />
            </Contenedor>
        </Fondo>
    )
}

export default Sesion