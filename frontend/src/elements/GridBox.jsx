
import React from "react";
import {Grid, Container, Box} from "@mui/material";
import PoductBox from "./ProductBox";


const GridBox= () => {

    return (
        <div>
            
            <Container > 
                <Box sx ={{ py: 4 }}>
                    <Grid container rowSpacing={2} spacing={{ xs: 1, sm: 2 }}> 
                        <PoductBox/>
                        <PoductBox/>
                        <PoductBox/>
                        <PoductBox/>
                        <PoductBox/>
                        <PoductBox/>
                    </Grid>
                </Box>
            </Container>
        </div>
    )

}

export default GridBox;