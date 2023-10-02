
import {Box,Grid,Typography} from "@mui/material";
import Alm from "../images/aluminio1.jpg"
import Caneleta from "../images/caneleta1.jpg"
import colores from "../styles/colores";
import "../App.css"


const ImgGrid = () => {

    return (   
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
     )  
      
  

            }

            export default ProductBox;