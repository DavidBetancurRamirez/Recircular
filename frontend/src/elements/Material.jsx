import styled from "styled-components"
import colores from "../styles/colores"

const ContenedorMaterial = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${props => (props.size=="small" ? "0 5px" : "0 8px")};
    width: ${props => (props.size=="small" ? "70px" : "100px")};
    height: ${props => (props.size=="small" ? "20px" : "30px")};
    border-radius: ${props => (props.size=="small" ? "10px" : "20px")};
    background-color: ${colores.verdeClaro};
    margin-right: 5px;
    text-transform: capitalize;

    p { font-size: ${props => (props.size=="small" ? "0.8rem" : "1rem")}; }

    span {
        width: ${props => (props.size=="small" ? "8px" : "12px")};
        height: ${props => (props.size=="small" ? "8px" : "12px")};
        border: 1px solid ${colores.azulOscuro};
        border-radius: 50%;
    }
`

const Material = ({ material, size }) => {
    return (
        <ContenedorMaterial size={size}>
            <p>{material.nombre}</p>
            <span style={{ backgroundColor: material.color }} />
        </ContenedorMaterial>
    )
}

export default Material;