import Layout from "./Layout";

import styled from "styled-components";
import { ContenedorPrincipal, ContenedorSombra, Volver, Formulario, Input } from "../styles/varios";

const ContenedorInput = styled.div`
    display: flex;
    align-items: center;
    height: 30px;

    p {
        font-weight: 700;
        font-size: 15px;
        margin-right: 10px;
    }
`


const Agregar = () => {
    return (
        <Layout>
            <ContenedorPrincipal>
                {window.innerWidth>800 && <Volver /> }
                <ContenedorSombra>
                    <h2>Agregar Producto</h2>
                    <Formulario>
                        <ContenedorInput>
                            <p>Nombre</p>
                            <Input 
                                required
                                name = "nombre"
                                type="text"
                                placeholder="Nombre"
                            />
                        </ContenedorInput>
                    </Formulario>
                </ContenedorSombra>
            </ContenedorPrincipal>
        </Layout>
    )
}

export default Agregar;