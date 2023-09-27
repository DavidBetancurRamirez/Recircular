import { useState } from "react";
import Layout from "./Layout";
import Volver from "../elements/Volver";
import SelecMateriales from "../elements/SelecMateriales";

import styled from "styled-components";
import colores from "../styles/colores";
import { ContenedorPrincipal, ContenedorSombra, Formulario, Input, InputFlexible } from "../styles/varios";

const ContenedorInput = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
    margin-bottom: 20px;
`
const Dividido = styled.div`
    display: flex;
    margin-bottom: 20px;

    > div { width: 50%; }

    @media (max-width: 800px) {
        flex-direction: column;
        > div { width: 100%}
    }
`
const Boton = styled.button`
    width: 150px;
    height: 30px;
    margin: 30px auto;
    border: none;
    border-radius: 20px;
    color: #fff;
    background-color: ${colores.azulOscuro};
    font-size: 14px;
    font-weight: normal;
    cursor: pointer;
`


const Agregar = () => {
    const [nombre, cambiarNombre] = useState("");
    const [materiales, cambiarMateriales] = useState([])
    const [descripcion, cambiarDescripcion] = useState("");
    const [caracteristicas, cambiarCaracteristicas] = useState("");


    return (
        <Layout>
            <ContenedorPrincipal>
                {window.innerWidth>800 && <Volver /> }
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
                        <Dividido>
                            <SelecMateriales materiales={materiales} cambiarMateriales={cambiarMateriales} />
                            <ContenedorInput>
                                <h3>Imagenes</h3>
                            </ContenedorInput>
                        </Dividido>
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
                        <div>
                            <h3>Caracteristicas</h3>
                            <InputFlexible 
                                required 
                                name = "caracteristicas"
                                type="text"
                                placeholder="Separar las caracteristicas por punto (.)"
                                value={caracteristicas}
                                onChange={(e) => cambiarCaracteristicas(e.target.value)}
                            />
                        </div>
                        <Boton>Agregar</Boton>
                    </Formulario>
                </ContenedorSombra>
            </ContenedorPrincipal>
        </Layout>
    )
}

export default Agregar;