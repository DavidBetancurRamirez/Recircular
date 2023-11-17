import { Box, Grid, Rating } from "@mui/material";
import { ContenedorScroll } from "../styles/varios"
import Material from "./Material"
import BtnAgregar from "./BtnAgregar";
import { useState } from "react";
import styled from "styled-components";
import colores from "../styles/colores";
import "../styles/imgStyle.css"
import { useEffect } from "react";
import { useUser, UserContextProvider } from "../context/userContext"
import { useMessage } from "../context/messageContext";
import { getFile } from "../firebase/config"
import { useNavigate } from "react-router-dom";
import Producto from '../components/Producto';

const Contenedor = styled.div`
    display: flex;
    justify-content: space-between;

    .estrellas {
        font-size: 18px;

        .MuiRating-iconFilled,
        .MuiRating-iconEmpty {
            font-size: 18px;
        }
    }
`
const NombreProducto = styled.button`
    width: 150px;
    height: auto;
    margin: 5px auto;
    border: none;
    border-radius: 20px;
    font-size: 1.2rem;
    cursor: pointer;
    background-color: ${colores.blanco};
    transition: 0.5s all ease;
    @media (max-width: 800px) { margin: 20px auto; }
`

const ProductBox = ( {nombre, imagenes = [], mat = [], nombre_usuario, caracteristicas = [], onClick} ) => {

    const { getUser } = useUser();
    const { newMessage } = useMessage();
    const [ material, setMaterial ] = useState([])
    const [ archivos, setArchivos ] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        const get_imagenes = async () => {
            var storage = []
            const imageContainer = document.getElementById(`imageContainer-${imagenes[0]}`);
            for (var i = 0; i < imagenes.length; i++) {
                storage.push(await getFile(imagenes[i]))
            }
            imageContainer.append(storage[1]);
        }
        const get_materiales = async () => {
            var storage = []
            for (var i = 0; i < mat.length; i++) {
                const nuevoMaterial = {
                    nombre: mat[i],
                    color: colores.materiales[mat[i]]
                }
                storage.push(nuevoMaterial)
            }
            setMaterial(storage)
        }
        get_imagenes();
        get_materiales();
    }, [getFile, getUser]);

    return (  
        <Grid item xs={12} sm={4} md={3} >
                <Box sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                    borderRadius: 2,
                    p: 1,
                }}>
                    <Box>  
                        <Box width={1} sx={{ height: '180px', overflow: 'hidden' }} id={`imageContainer-${imagenes[0]}`}>
                        </Box>
                        <NombreProducto onClick={onClick}>{nombre}</NombreProducto>
                        <ContenedorScroll size="full">
                            {material.map((material, index) => (
                                <div>
                                    <Material material={material} size="small" />
                                </div>
                            ))}
                        </ContenedorScroll>
                    </Box>         

                    <Box sx={{width: 1}} marginTop={1} >
                        <Contenedor>
                            <div> 
                                <h3>{nombre_usuario}</h3>                         
                                {/* <Rating value={4.5} precision={0.5} readOnly className="estrellas" /> */}
                            </div>
                            <BtnAgregar size="small" />
                        </Contenedor>
                    </Box>
                </Box>
        </Grid>
    )

}

export default ProductBox;