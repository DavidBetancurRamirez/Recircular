import styled from "styled-components";
import colores from "../styles/colores";
import Logo from "../images/logo4.png"
import { AiOutlineMail, AiOutlineInstagram } from "react-icons/ai"
import { BsWhatsapp } from "react-icons/bs"

const ContenedorFooter = styled.footer`
    background-color: ${colores.azulOscuro};
    padding: 20px 50px 10px 50px;

    > p {
        color: #fff;
        font-size: 0.8rem;
        width: 100%;
        text-align: center;
    }

    @media (max-width: 800px) {
        padding: 15px;

        > p { margin-top: 10px; }
    }
`
const Contenedor = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px dashed #fff;
    padding-bottom: 20px;
    margin-bottom: 10px;

    @media (max-width: 800px) {
        flex-direction: column;
        padding-bottom: 0px;
        margin-bottom: 0px;
    }
`
const Info = styled.div`
    img {
        height: 50px;
    }

    p {
        color: #fff;
        font-size: 0.9rem;
        font-weight: lighter;
        width: 385px;
    }

    @media (max-width: 800px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: 1px dashed #fff;
        padding-bottom: 15px;

        img {
            height: 40px;
            margin-bottom: 10px;
        }

        p {
            width: 100%;
            text-align: center;
        }
    }
`
const Links = styled.div`
    p {
        color: #fff;
        font-weight: lighter;
        margin: 5px;
        cursor: pointer;
    }

    p:hover { color: ${colores.azulClaro}; }

    > p {
        color: ${colores.azulClaro};
        margin-bottom: 5px;
        font-size: 1.1rem;
        font-weight: bold;
        cursor: auto;
    }

    @media (max-width: 800px) {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        padding: 15px 0;
        border-bottom: 1px dashed #fff;
    }
`
const Contacto = styled.div`
    p {
        color: ${colores.azulClaro};
        margin-bottom: 10px;
        font-size: 1.1rem;
        font-weight: bold;
        cursor: auto;
    }

    div {
        display: flex;
        transition: background-color 0.3s;

        > div:hover {
            background-color: ${colores.azulClaro};
            color: #fff;
        }
    }

    @media (max-width: 800px) {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 100%;
        padding: 15px 0;
    }
`
const RedSocial = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;

    svg {
        width: 50%;
        height: 50%;
    }

    @media (max-width: 800px) {
        width: 30px;
        height: 30px;
    }
`


const Footer = () => {
    return (
        <ContenedorFooter>
            <Contenedor>
                <Info>
                    <img src={Logo} alt="Logo Recircular" />
                    <p>Conectamos empresas para promover la reutilización de recursos y la reducción de desperdicios. Simplificamos la publicación y búsqueda de excedentes y materiales no deseados, con perfiles de empresa, herramientas de gestión de inventarios y análisis de datos, impulsando un futuro más sostenible.</p>
                </Info>

                <Links>
                    <p>Links útiles</p>
                    <div>
                        <p>Principal</p>
                        <p>Agregar Producto</p>
                    </div>
                    <div>
                        <p>Perfil</p>
                        <p>Carrito</p>
                    </div>
                </Links>

                <Contacto>
                    <p>Contactenos</p>
                    <div>
                        <RedSocial> <AiOutlineMail /> </RedSocial>
                        <RedSocial> <BsWhatsapp /> </RedSocial>
                        <RedSocial> <AiOutlineInstagram /> </RedSocial>
                    </div>
                </Contacto>

            </Contenedor>
            <p>© Todos los derechos reservados</p>
        </ContenedorFooter>
    )
}

export default Footer;