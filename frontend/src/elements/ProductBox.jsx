import { Box, Grid, Rating } from "@mui/material";
import { ContenedorScroll } from "../styles/varios"
import Material from "./Material"
import BtnAgregar from "./BtnAgregar";

import styled from "styled-components";
import colores from "../styles/colores";
import "../styles/imgStyle.css"
import Alm from "../images/aluminio1.jpg";

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

const ProductBox= () => {
    const material = {
        nombre: "madera",
        color: colores.materiales.madera
    }

    return (  
        <Grid item xs={12} sm={4} md={3} >
            <Box sx={{
                bgcolor: 'background.paper',
                boxShadow: 3,
                borderRadius: 2,
                p: 1,
            }}>
                <Box>  
                    <Box width={1}>
                        <img 
                            src={Alm}
                            alt=""
                            className= "img"
                        />
                    </Box>
                    <NombreProducto>Acerrin</NombreProducto>
                    <ContenedorScroll size="full">
                        <div>
                            <Material material={material} size="small" />
                        </div>
                    </ContenedorScroll>
                </Box>         

                <Box sx={{width: 1}} marginTop={1} >
                    <Contenedor>
                        <div> 
                            <h3>PrimaderaSAS</h3>                         
                            <Rating value={4.5} precision={0.5} readOnly className="estrellas" />
                        </div>

                        <BtnAgregar size="small" />
                    </Contenedor>
                </Box>
            </Box>
        </Grid>
    )

}

export default ProductBox;