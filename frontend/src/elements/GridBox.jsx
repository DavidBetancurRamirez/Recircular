import {Grid, Container, Box} from "@mui/material";
import PoductBox from "./ProductBox";
import { useEffect } from "react";
import { useUser, UserContextProvider } from "../context/userContext"
import { useMessage } from "../context/messageContext";
import { useState } from "react";
import { getFile } from "../firebase/config"
import { useNavigate } from "react-router-dom";
import Producto from '../components/Producto';

const GridBox= () => {
    const { searchProduct, getAllProducts, getProduct } = useUser()
    const { newMessage } = useMessage();
    const [ productos, setProductos ] = useState([])
    const [ nombre, setNombre ] = useState("")
    const navigate = useNavigate();

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

    const handleNombreProductoClick = async (id) => {
        try {
            localStorage.setItem("idProducto", id);
            navigate("/producto");
        } catch (error) {
            console.log(error)
            newMessage("Inténtelo más tarde", "error");
        }
    };


    return (
        <div>
            <Container > 
                <Box sx ={{ py: 4 }}>
                    <Grid container rowSpacing={2} spacing={{ xs: 1, sm: 2 }}> 
                    {productos.map((producto, index)=>(
                        <PoductBox nombre={producto.name} imagenes={producto.images} mat={producto.materials} nombre_usuario={producto.user_id} caracteristicas={producto.characteristics} onClick={() => handleNombreProductoClick(producto.id)}/>
                    ))}
                    </Grid>
                </Box>
            </Container>
        </div>
    )

}

export default GridBox;