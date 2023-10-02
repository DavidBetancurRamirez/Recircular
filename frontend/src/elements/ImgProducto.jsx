import { useState } from "react";

import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Img1 from "../images/Producto/aserrin.jpg"
import Img2 from "../images/Producto/aserrin1.jpg"
import Img3 from "../images/Producto/aserrin2.jpg"

const Contenedor = styled.div`
    display: flex;
`;
const ImagenPrincipal = styled.div`
    width: 350px;
    height: 350px;

    img {
        width: 100%;
        height: 100%;
    }
`;
const Miniaturas = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
`;
const Miniatura = styled.img`
    width: 30px;
    height: 30px;
    margin-bottom: 10px;
`;


const ImgProducto = () => {
    const imagenes = [Img1, Img2, Img3]
    const [imagenPrincipal, setImagenPrincipal] = useState(imagenes[0]);


    return (
        <Carousel
            infiniteLoop={true}
            showIndicators={false}
            showThumbs={false}
            showStatus={false}
            verticalSwipe="vertical"
        >
            {imagenes.map((imagen, i) => (
                <Contenedor key={i}>
                    <ImagenPrincipal>
                        <img src={imagenPrincipal} alt={`Imagen`} />
                    </ImagenPrincipal>
                    <Miniaturas>
                        {imagenes.map((miniatura, j) => (
                            <Miniatura 
                                key={j}
                                src={miniatura}
                                alt={`Miniatura ${j}`}
                                onClick={() => setImagenPrincipal(miniatura)}
                            />
                        ))}
                    </Miniaturas>
                </Contenedor>
            ))}
        </Carousel>
    )
}

export default ImgProducto;