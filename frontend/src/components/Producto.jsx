import Layout from "./Layout";
import ImgProducto from "../elements/ImgProducto";
import InfoContacto from "../elements/InfoContacto";
import Material from "../elements/Material";
import BtnAgregar from "../elements/BtnAgregar";
import { useState } from "react";
import styled from "styled-components";
import colores from "../styles/colores";
import { ContenedorScroll, ContenedorSombra, Mitad } from "../styles/varios";
import { useEffect } from "react";
import { useUser, UserContextProvider } from "../context/userContext"
import { useMessage } from "../context/messageContext";
import { getFile } from "../firebase/config"
import { useNavigate } from "react-router-dom";

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

const Producto = ({nombre, imagenes = [], mat = [], nombre_usuario, caracteristicas = [], email, telefono}) => {

    console.log("Datos del producto recibidos en Producto:", {
        nombre,
        imagenes,
        mat,
        nombre_usuario,
        caracteristicas,
        email,
        telefono
    });

    const { getUser } = useUser();
    const { newMessage } = useMessage();
    const [ material, setMaterial ] = useState([])

    useEffect(() => {
        const get_materiales = async () => {
            var storage = []
            console.log(mat)
            for (var i = 0; i < mat.length; i++) {
                const nuevoMaterial = {
                    nombre: mat[i],
                    color: colores.materiales[mat[i]]
                }
                storage.push(nuevoMaterial)
            }
            setMaterial(storage)
        }
        get_materiales();
    }, [getFile, getUser]);

    return (
        <Layout>
            <ContenedorSombra>
                <Mitad>
                    <Contenedor>
                        <ImgProducto imagenes={imagenes} />
                        {/* <BtnAgregar /> */}
                        <InfoContacto nombre_usuario={nombre_usuario} email={email} telefono={telefono}/>
                    </Contenedor>
                    <Contenedor>
                        <ContenedorScroll size="full">
                            {material.map((material, index) => (
                                <div>
                                    <Material material={material} size="small" />
                                </div>
                            ))}
                        </ContenedorScroll>
                        <h2>{nombre}</h2>
                        <p></p>
                        <ContCaracteristicas>
                            <h3>Caracteristicas</h3>
                            <ul>
                                {caracteristicas.map((caracteristica, index) => (
                                    <li key={index}>{caracteristica}</li>
                                ))}
                            </ul>
                        </ContCaracteristicas>
                    </Contenedor>
                </Mitad>
            </ContenedorSombra>
        </Layout>
    )
}

export default Producto;