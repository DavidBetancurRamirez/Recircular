import styled from "styled-components";
import colores from "./colores";

import { WiDirectionLeft } from "react-icons/wi"

export const ContenedorPrincipal = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 20px auto;
    width: 90%;
    max-width: 1000px;
`
export const ContenedorSombra = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 20px;
    z-index: -1;
    margin: 20px 0;
    padding: 10px 20px;
    background: linear-gradient(315deg, #ffffff, ${colores.gris});
    box-shadow:  -5px -5px 10px #cecece,
                10px 10px 10px #ffffff;

    h2 {
        width: 100%;
        text-align: center;
        font-size: 20px;
        margin-bottom: 20px;
    }
`

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
export const Volver = () => {
    return (
        <ContenedorVolver>
            <Flecha><WiDirectionLeft /></Flecha>
            <p>Volver</p>
        </ContenedorVolver>
    )
}

export const Formulario = styled.form`
    display: flex;
    flex-direction: column;
`

export const Input = styled.input`
    background-color: #fff;
    opacity: .8;
    border-radius: 10px;
    border: 1px solid #fff;
    outline: none;
    padding: 10px;
    width: 100%;
    height: 100%;
    font-size: 14px;
`