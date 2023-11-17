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

const Materiales = ({ mat = []}) => {

    const [ material, setMaterial ] = useState([])

    useEffect(() => {
        const get_materiales = async () => {
            if (mat != undefined){
                var storage = []
                for (var i = 0; i < mat.length; i++) {
                    // const nuevoMaterial = {
                    //     nombre: mat[i],
                    //     color: colores.materiales[mat[i]]
                    // }
                    // storage.push(nuevoMaterial)
                    storage.push(mat[i])
                }
                setMaterial(storage)
                console.log(material)
            }
        }
        get_materiales();
    }, []);


    return (
        <ContenedorScroll size="full">
            {material.map((m, index) => (
                <div>
                    <Material material={m} size="small" />
                </div>
            ))}                    
        </ContenedorScroll>
    )
}

export default Materiales;