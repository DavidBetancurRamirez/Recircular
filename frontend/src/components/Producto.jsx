import Layout from "./Layout";
import ImgProducto from "../elements/ImgProducto";
import InfoContacto from "../elements/InfoContacto";
import Material from "../elements/Material";
import BtnAgregar from "../elements/BtnAgregar";

import styled from "styled-components";
import colores from "../styles/colores";
import { ContenedorScroll, ContenedorSombra, Mitad } from "../styles/varios";

const Contenedor = styled.div`
    padding: 10px;

    h2 {
        text-align: left;
        margin: 10px 0;
    }

    p { text-align: justify; }
`
const ContCaracteristicas = styled.div`
    margin: 10px 0;

    ul {
        list-style: none; /* Quita las viñetas predeterminadas */
        margin-top: 5px;
    }

    li {
        margin-left: 20px;
        position: relative;
    }

    li::before {
        content: "•";
        color: #000;
        font-size: 16px;
        position: absolute;
        left: -15px;
        top: 0;
    }
`


const Caracteristicas = () => {
    const caracteristicas = [
        "Varios tipos de madera",
        "100% de madera seca",
        "Textura lisa"
    ]

    return (
        <ContCaracteristicas>
            <h3>Caracteristicas</h3>
            <ul>
                {caracteristicas.map((caracteristica, index) => (
                    <li key={index}>{caracteristica}</li>
                ))}
            </ul>
        </ContCaracteristicas>
    )
}

const Producto = () => {
    const materiales = Object.entries(colores.materiales).map(([nombre, color]) => ({
        // Guardar el nombre del material y el color en un arreglo
        nombre,
        color
    }));

    return (
        <Layout>
            <ContenedorSombra>
                <Mitad>
                    <Contenedor>
                        <ImgProducto />
                        <BtnAgregar />
                        <InfoContacto />
                    </Contenedor>
                    <Contenedor>
                        <ContenedorScroll size="full">
                            {materiales.map((material, index) => {
                                return (
                                    <div key={index}>
                                        <Material material={material} />
                                    </div>
                                )
                            })}
                        </ContenedorScroll>
                        <h2>Aserrin</h2>
                        <p>Somos una empresa que trabaja con madera y nos sobra gran cantidad de aserrín de nuestra producción.</p>
                        <Caracteristicas />
                    </Contenedor>
                </Mitad>
            </ContenedorSombra>
        </Layout>
    )
}

export default Producto;