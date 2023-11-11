import styled from "styled-components";
import { GiShoppingCart } from "react-icons/gi"
import { FaUserCircle } from "react-icons/fa";
import { useUser } from "../context/userContext";

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
    const { user } = useUser();

    return (
        <ContenedorUsuario>
            <Usuario>
                <p>{user ? user.username : "Anonymous"}</p>
                <FaUserCircle />
            </Usuario>
            <GiShoppingCart />
        </ContenedorUsuario>
    )
}

export default UsuarioHeader;