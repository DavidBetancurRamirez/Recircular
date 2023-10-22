
import {Box,Typography} from "@mui/material";
import Alm from "../images/aluminio1.jpg"
import colores from "../styles/colores";

const InfoBox = () => {

    return (   
        <Box>  
            <Box width={1}>
                <img 
                    src={Alm}
                    alt=""
                    className= "img"
                />
            </Box >
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
        </Box>
     )  
}

export default InfoBox;