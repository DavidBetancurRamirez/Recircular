import { Box, Grid, Rating } from "@mui/material";
import { ContenedorScroll } from "../styles/varios"
import Material from "./Material"
import BtnAgregar from "./BtnAgregar";
import { useState } from "react";
import styled from "styled-components";
import colores from "../styles/colores";
import "../styles/imgStyle.css"
import Alm from "../images/aluminio1.jpg";
import { useEffect } from "react";
import { useUser, UserContextProvider } from "../context/userContext"
import { useMessage } from "../context/messageContext";
import { getFile } from "../firebase/config"

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
const NombreProducto = styled.h3`
    font-size: 1.2rem;
`

const ProductBox = ( {nombre, imagenes = [], materiales = [], nombre_usuario} ) => {

    const { newMessage } = useMessage();
    const [ material, setMaterial ] = useState([])
    const [ archivos, setArchivos ] = useState('')

    useEffect(() => {
        const get_imagenes = async () => {
            var storage = []
            const imageContainer = document.getElementById('imageContainer');
            for (var i = 0; i < imagenes.length; i++) {
                storage.push(await getFile(imagenes[i]))
                console.log(storage[i])
            }
            console.log(storage.length)
            imageContainer.appendChild(storage[0]);
        }
        get_imagenes();
    }, [getFile]);

    return (  
        <Grid item xs={12} sm={4} md={3} >
                <Box sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                    borderRadius: 2,
                    p: 1,
                }}>
                    <Box>  
                        <Box width={1} sx={{ height: '180px', overflow: 'hidden' }} id="imageContainer">
                        </Box>
                        <NombreProducto>{nombre}</NombreProducto>
                        <ContenedorScroll size="full">
                            {/* <console className="log">{materiales}</console> */}
                            {/* {materiales.map((material, index) => (
                                <div>
                                    <Material material={material} size="small" />
                                </div>
                            ))} */}
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