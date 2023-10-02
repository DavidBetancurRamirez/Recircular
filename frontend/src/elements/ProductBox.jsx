import {Box,Grid,Typography,Rating} from "@mui/material";
import colores from "../styles/colores";
import { GiShoppingCart } from "react-icons/gi"
import InfoBox from "./InfoBox"; 

const ProductBox= () => {

    return (  
        <Grid item xs={12} sm={4} md={3} >
            <Box sx={{
                bgcolor: 'background.paper',
                boxShadow: 3,
                borderRadius: 2,
                p: 1,
            }}>
                <Box><InfoBox/></Box>            

                <Box sx={{width: 1}} marginTop={1} >
                    <Grid container spacing={5} >
                        <Grid item  md={6} xs={6}> 
                            <Box sx={{width: 0.5 }}>
                                <Typography variant ="body" component ="h3">
                                    PrimaderaSAS
                                </Typography>                         
                                <Rating   value={4.5} precision={0.5}  readOnly />
                            </Box>
                        </Grid>

                        <Grid item md={6} xs={6}>
                            <Box sx={{ 
                                backgroundColor: colores.azulOscuro,
                                borderRadius: 5,             
                                maxWidth: 110,
                                maxHeight: 40,
                                display: "flex",
                                alignItems: "center",
                                pl: 1.5,
                            }}>
                                <Box sx={{ 
                                    color : "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                }}>
                                    <GiShoppingCart />
                                </Box>
                                <Typography variant ="body4" component = "p" padding={1} color={"#fff"} >
                                    Añadir
                                </Typography>   
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Grid>
    )

}

export default ProductBox;