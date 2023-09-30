import styled from "styled-components"
import colores from "../styles/colores"
import { WiDirectionLeft } from "react-icons/wi"

const ContenedorVolver = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90px;
    height: 30px;
    border: none;
    border-radius: 20px;
    padding: 5px;
    background-color: ${colores.azulOscuro};
    cursor: pointer;

    p {
        color: #fff;
        margin-right: 5px;
        font-weight: lighter;
        font-size: 15px;
    }
`
const Flecha = styled.div`
    width: 20px;
    height: 20px;
    background-color: ${colores.verdeClaro};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 80%;
        height: 80%;
        color: ${colores.azulOscuro};
    }
`
const Volver = () => {
    return (
        <ContenedorVolver>
            <Flecha><WiDirectionLeft /></Flecha>
            <p>Volver</p>
        </ContenedorVolver>
    )
}

export default Volver;