import styled from "styled-components";
import { GiShoppingCart } from "react-icons/gi"
import { FaUserCircle } from "react-icons/fa";

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
    return (
        <ContenedorUsuario>
            <Usuario>
                <p>Anonimus</p>
                <FaUserCircle />
            </Usuario>
            <GiShoppingCart />
        </ContenedorUsuario>
    )
}

export default UsuarioHeader;