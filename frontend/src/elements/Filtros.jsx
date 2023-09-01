import styled from "styled-components";
import colores from "../styles/colores";
import { HiAdjustmentsHorizontal } from "react-icons/hi2"

const ContenedorFiltros = styled.div`
    background-color: ${colores.azulOscuro};
    color: #fff;
    border-radius: 10px 0 0 10px;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    svg {
        width: 22px;
        height: 22px;
        margin-left: 10px;
    }

    @media (max-width: 800px) {
        width: 100px;
        border-radius: 10px;

        svg {
            margin: 0;
        }
    }
`

const Filtros = () => {
    return (
        <ContenedorFiltros>
            <p>Filtros</p>
            <HiAdjustmentsHorizontal />
        </ContenedorFiltros>
    )
}

export default Filtros;