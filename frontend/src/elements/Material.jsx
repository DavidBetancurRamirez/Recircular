import styled from "styled-components"
import colores from "../styles/colores"

const ContenedorMaterial = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
    width: 100px;
    height: 30px;
    border-radius: 20px;
    background-color: ${colores.verdeClaro};
    margin-right: 5px;
    text-transform: capitalize;

    span {
        width: 12px;
        height: 12px;
        border: 1px solid ${colores.azulOscuro};
        border-radius: 50%;
    }
`

const Material = ({ material }) => {
    return (
        <ContenedorMaterial>
            <p>{material.nombre}</p>
            <span style={{ backgroundColor: material.color }} />
        </ContenedorMaterial>
    )
}

export default Material;