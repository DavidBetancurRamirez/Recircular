import styled from "styled-components";
import colores from "../styles/colores";

const Contenedor = styled.div`
background-color: ${colores.azulOscuro};
height: 80px;
display: flex;
@media (max-width: 700px) {
    height: 40px;
}
`;


const Footer = () => {
    return (
        <Contenedor>

        </Contenedor>
      
    )
}

export default Footer