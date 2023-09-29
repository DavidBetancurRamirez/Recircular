import { useState } from "react";
import Layout from "./Layout";
import BtnVolver from "../elements/BtnVolver";
import SelecMateriales from "../elements/SelecMateriales";
import Imagenes from "../elements/Imagenes";

import styled from "styled-components";
import colores from "../styles/colores";
import { ContenedorPrincipal, ContenedorSombra, Formulario, Input, InputFlexible, Mitad } from "../styles/varios";
import Caracteristicas from "../elements/Caracteristicas";

const ContenedorInput = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
    margin-bottom: 20px;
`
const Boton = styled.button`
    width: 150px;
    height: 30px;
    margin: 25px auto;
    border: none;
    border-radius: 20px;
    color: #fff;
    background-color: ${colores.azulOscuro};
    font-size: 14px;
    font-weight: normal;
    cursor: pointer;
    transition: 0.5s all ease;

    &:hover { color: ${colores.azulClaro}; }
`


const Agregar = () => {
    const [nombre, cambiarNombre] = useState("");
    const [materiales, cambiarMateriales] = useState([])
    const [imagenes, cambiarImagenes] = useState([])
    const [descripcion, cambiarDescripcion] = useState("");
    const [caracteristicas, cambiarCaracteristicas] = useState([""]);


    return (
        <Layout>
            <ContenedorPrincipal>
                <BtnVolver />
                <ContenedorSombra>
                    <h2>Agregar Producto</h2>
                    <Formulario>
                        <ContenedorInput>
                            <h3>Nombre</h3>
                            <Input 
                                required
                                name = "nombre"
                                type="text"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={(e) => cambiarNombre(e.target.value)}
                            />
                        </ContenedorInput>

                        <Mitad>
                            <SelecMateriales materiales={materiales} cambiarMateriales={cambiarMateriales} />
                            <Imagenes imagenes={imagenes} cambiarImagenes={cambiarImagenes} />
                        </Mitad>

                        <div>
                            <h3>Descipción</h3>
                            <InputFlexible 
                                required 
                                name = "descipcion"
                                type="text"
                                placeholder="Descripción de donde proviene el producto"
                                value={descripcion}
                                onChange={(e) => cambiarDescripcion(e.target.value)}
                            />
                        </div>

                        <Caracteristicas caracteristicas={caracteristicas} cambiarCaracteristicas={cambiarCaracteristicas} />

                        <Boton>Agregar</Boton>
                    </Formulario>
                </ContenedorSombra>
            </ContenedorPrincipal>
        </Layout>
    )
}

export default Agregar;