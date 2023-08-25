import { useState } from "react"
import styled from "styled-components";
import Imagen from "../images/fondo-sesion.jpg"
import HeaderSesion from "../elements/HeaderSesion"

const Fondo = styled.div`
    background-image: url(${Imagen});
    background-size: cover;
    background-position: center center;
    background-attachment: fixed;
    width: 100vw;
    height: 100vh;
    padding: 100px;
`;
const Contenedor = styled.div`
    width: 1000px;
    margin: auto;
`;

const Sesion = () => {
    // Para saber en que pestaña se encuentra el usuario
    const [inLogin, cambiarInLogin] = useState(true);
    
    return (
        <Fondo>
            <Contenedor>
                <HeaderSesion inLogin={inLogin} cambiarInLogin={cambiarInLogin} />
            </Contenedor>
        </Fondo>
    )
}

export default Sesion