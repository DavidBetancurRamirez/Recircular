import {Box,Grid,Typography} from "@mui/material";
import colores from "../styles/colores";
import "../App.css"
import { GiShoppingCart } from "react-icons/gi"

const ProductBox= () => {

    return (  
        <Grid item xs={12} sm={4} md={3} >
        <Box 
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 3,
            borderRadius: 2,
            p: 1,
          }}
        >
           <Box>  
            <Box width={1}>
            <img 
                        src={Alm}
                        alt=""
                        className= "img"
                        />
            </Box >
            <Box sx={{width: 1}}>
                <Grid container spacing={1}>
                    <Grid item md={3}>
                        <img 
                                src={Caneleta}
                                alt=""
                                className= "img2"
                                />
                    </Grid>
                    <Grid item md={3} >
                        <img 
                                src="https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/usos-del-aserrin-_alicja_.jpg"
                                alt=""
                                className= "img2"
                                />
                    </Grid>                          
                </Grid> 
            </Box>
         </Box>
         <Box >
            <Typography variant ="h4" component ="h2" pb={1} pt={2}>
                Acerrin
                </Typography>
         </Box >
         <Box 
         sx={{ 
            backgroundColor: colores.verdeClaro,
            borderRadius: 5,
            padding: 1,
            maxWidth: 80,
            maxHeight: 25,
            display: "flex",
            alignItems: "center",
            fontWeight: 'bold',

         }}>
           
        <Typography variant ="body4" component = "p" >
            madera 
        </Typography>
 
         </Box>

         <Box sx={{width: 1}} marginTop={3}>
            <Grid container spacing={8} >
                <Grid item md={6}  > 
                <Typography variant ="body" component ="h3">
                PrimaderaSAS
                </Typography>
                <img src="https://nitricoxidereport.com/wp-content/uploads/2016/05/4-star-rating-1024x194.png"
                    className="img4"
                    />


                </Grid>

             
                <Grid item md={6} >
                <Box 
                    sx={{ 
                        backgroundColor: colores.azulOscuro,
                        borderRadius: 5,             
                        maxWidth: 110,
                        maxHeight: 40,
                        display: "flex",
                        alignItems: "center",
                        pl: 1.5,
                       
                      

                    }}>
                        <Box
                            sx={{ 
                                color : "#fff"}} >

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