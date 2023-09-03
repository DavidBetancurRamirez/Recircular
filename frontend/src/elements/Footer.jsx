import styled from "styled-components";
import colores from "../styles/colores";
import Logo from "../images/logo4.png"

const Contenedor = styled.footer`
    background-color: ${colores.azulOscuro};
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        height: 50px;
        margin: 15px;
    }

    @media (max-width: 800px) {
        img {
            height: 30px;
            margin: 10px;
        }
    }
`

const Footer = () => {
    return (
        <Contenedor>
            <img src={Logo} alt="Logo recircular" />
        </Contenedor>
    )
}

export default Footer;