import styled from "styled-components";
import { GiShoppingCart } from "react-icons/gi"
import { FaUserCircle } from "react-icons/fa";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const ContenedorUsuario = styled.div`
    display: flex;
    align-items: center;

    svg {
        width: 30px;
        height: 30px;
        cursor: pointer;
    }

    @media (max-width: 800px) {
        svg {
            width: 25px;
            height: 25px;
        }
    }
`
const Usuario = styled.div`
    display: flex;
    align-items: center;
    margin: 20px;
    cursor: pointer;

    svg { margin: 0 5px; }

    @media (max-width: 800px) {
        margin: 10px;

        p { display: none; }
    }
`

const UsuarioHeader = () => {
    const navigate = useNavigate();
    const { nombreUsuario } = useUser();

    return (
        <ContenedorUsuario>
            <Usuario>
                <p onClick={() => navigate("/sesion")}>Iniciar Sesión</p>
                <p>{nombreUsuario}</p>
                <FaUserCircle />
            </Usuario>
            <GiShoppingCart />
        </ContenedorUsuario>
    )
}

export default UsuarioHeader;