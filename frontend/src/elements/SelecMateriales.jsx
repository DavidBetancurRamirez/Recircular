import { useState } from 'react';
import Material from './Material';
import { ContenedorScroll } from '../styles/varios';

import styled from 'styled-components';
import colores from '../styles/colores';
import { AiFillCaretDown } from "react-icons/ai";

const ContenedorSelect = styled.div`
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #fff;
    border-radius: 10px;
    padding: 5px;
    width: 250px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    transition: 1s ease all;
    text-transform: capitalize;
    z-index: 1;

    &:hover { background: ${colores.grisClaro}; }

    svg {
        width: 20px;
        height: 20px;
        color: ${colores.azulClaro};
    }
`;
const Opciones = styled.div`
    background-color: #fff;
    position: absolute;
    top: 35px;
    left: 0;
    width: 100%;
    border-radius: 10px;
    max-height: 200px;
    overflow-y: auto;

    .agregado { 
        color: ${colores.verdeOscuro};
        text-decoration: underline;
    }
`; 
const Opcion = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    height: 30px;

    &:hover { background: ${colores.grisClaro}; }

    span {
        width: 10px;
        height: 10px;
        border: 1px solid ${colores.azulOscuro};
        border-radius: 50%;
    }
`;


const SelecMateriales = ({ materiales, cambiarMateriales }) => {
    const [mostrarSelect, cambiarMostrarSelect] = useState(false)
    const materialColor = Object.entries(colores.materiales).map(([nombre, color]) => ({
        // Guardar el nombre del material y el color en un arreglo
        nombre,
        color
    }));

    const handleClick = (material) => {
        // Comprueba si el material ya está en el estado.
        const materialExistente = materiales.find((m) => m.nombre === material.nombre);

        if (materialExistente) {
            // Si el material ya está presente, se elimina
            const nuevosMateriales = materiales.filter((m) => m.nombre !== material.nombre);
            cambiarMateriales(nuevosMateriales);
        } else {
            // Si el material no está presente, se agrega
            cambiarMateriales([...materiales, material]);
        }
    }

    return (
        <div>
            <ContenedorSelect onClick={() => cambiarMostrarSelect(!mostrarSelect)}>
                <p>Materiales</p>
                <AiFillCaretDown />

                {mostrarSelect && 
                    <Opciones>
                        {materialColor.map((material, index) => {
                            const materialAgregado = materiales.find((m) => m.nombre === material.nombre);
                            return (
                                <Opcion key={index} 
                                    onClick={() => handleClick(material)}
                                    className={materialAgregado && "agregado"}
                                >
                                    <p>{material.nombre}</p>
                                    <span style={{ backgroundColor: material.color }} />
                                </Opcion>
                            )
                        })}
                    </Opciones>
                }
            </ContenedorSelect>
            <ContenedorScroll>
                {materiales.map((material, index) => {
                    return (
                        <div key={index}>
                            <Material material={material} />
                        </div>
                    )
                })}
            </ContenedorScroll>
        </div>
    )
}

export default SelecMateriales;