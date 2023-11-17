import Layout from "./Layout";
import ImgProducto from "../elements/ImgProducto";
import InfoContacto from "../elements/InfoContacto";
import Material from "../elements/Material";
import BtnAgregar from "../elements/BtnAgregar";
import { useState } from "react";
import styled from "styled-components";
import colores from "../styles/colores";
import Caracteristicas from "../elements/Caract"
import { ContenedorScroll, ContenedorSombra, Mitad } from "../styles/varios";
import { useEffect } from "react";
import { useUser, UserContextProvider } from "../context/userContext"
import { useMessage } from "../context/messageContext";
import { getFile } from "../firebase/config"
import { useNavigate } from "react-router-dom";
import Materiales from "../elements/Mat";

const Contenedor = styled.div`
    padding: 10px;

    h2 {
        text-align: left;
        margin: 10px 0;
    }

    p { text-align: justify; }
`


const Producto = () => {

    const { getUser, getProduct } = useUser();
    const { newMessage } = useMessage();
    const [ p, setProducto ] = useState([])

    useEffect(() => {
        const obtenerProducto = async () => {
            try {
                const productoObtenido = await getProduct();
                if (typeof respuesta === 'string') newMessage(respuesta, "error");
                else setProducto(productoObtenido[0]);
                console.log(productoObtenido[0])
            } catch (error) {
                newMessage("Inténtelo más tarde", "error");
            }
        }
        obtenerProducto();
    }, [getProduct]);

    return (
        <Layout>
            <ContenedorSombra>
                <Mitad>
                    <Contenedor>
                        <ImgProducto imagenes={p.images} />
                        {/* <ImgProducto></ImgProducto> */}
                        {/* <BtnAgregar /> */}
                        <InfoContacto nombre_usuario={p.user_id} email={p.user_email} telefono={p.user_phone}/>
                    </Contenedor>
                    <Contenedor>
                        {/* <Material material={p.materials}></Material> */}
                        <h2>{p.name}</h2>
                        <p>{p.description}</p>
                        <Caracteristicas c={p.characteristics}></Caracteristicas>
                    </Contenedor>
                </Mitad>
            </ContenedorSombra>
        </Layout>
    )
}

export default Producto;