import styled from "styled-components"
import colores from "../styles/colores"
import { GiShoppingCart } from "react-icons/gi"

const BotonAgregar = styled.button`
    height: ${props => (props.size=="small" ? "30px" : "40px")};
    width: ${props => (props.size=="small" ? "40px" : "50px")};
    border: none;
    border-radius: 20px;
    background-color: ${colores.azulOscuro};
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    margin: ${props => (props.size=="small" ? "0" : "auto")};;
    cursor: pointer;
    transition: 0.5s all ease;

    &:hover { color: ${colores.azulClaro}; }

    svg {
        width: 20px;
        height: 20px;
    }
`

const BtnAgregar = ({ size }) => {
    return (
        <BotonAgregar size={size}>
            <GiShoppingCart />
        </BotonAgregar>
    )
}

export default BtnAgregar;