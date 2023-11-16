import {Grid, Container, Box} from "@mui/material";
import PoductBox from "./ProductBox";
import { useEffect } from "react";
import { useUser, UserContextProvider } from "../context/userContext"
import { useMessage } from "../context/messageContext";
import { useState } from "react";
import { getFile } from "../firebase/config"

const GridBox= () => {
    const { searchProduct, getAllProducts } = useUser()
    const { newMessage } = useMessage();
    const [ productos, setProductos ] = useState([])
    const [ archivos, setArchivos ] = useState([])

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const productosObtenidos = await getAllProducts();
                if (typeof respuesta === 'string') newMessage(respuesta, "error");
                else setProductos(productosObtenidos);
            } catch (error) {
                newMessage("Inténtelo más tarde", "error");
            }
        }
        obtenerProductos();
    }, [getAllProducts]);


    return (
        <div>
            <Container > 
                <Box sx ={{ py: 4 }}>
                    <Grid container rowSpacing={2} spacing={{ xs: 1, sm: 2 }}> 
                    {productos.map((producto, index)=>(
                        <PoductBox nombre={producto.name} imagenes={producto.images} materiales={producto.materiales} nombre_usuario={"Hola"}/>
                    ))}
                        {/* <PoductBox />
                        <PoductBox />
                        <PoductBox />
                        <PoductBox />
                        <PoductBox /> */}

                    </Grid>
                </Box>
            </Container>
        </div>
    )

}

export default GridBox;