import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Img1 from "../images/Producto/aserrin.jpg"
import Img2 from "../images/Producto/aserrin1.jpg"
import Img3 from "../images/Producto/aserrin2.jpg"

const ContenedorImagen = styled.article`
    height: 300px;
    width: 100%;

    img { width: 100%; }

    @media (max-width: 800px) { height: 300px; }
    @media (max-width: 500px) { height: 250px; }
`


const ImgProducto = () => {
    const imagenes = [Img1, Img2, Img3]

    return (
        <Carousel
            infiniteLoop={true}
            showIndicators={true}
            showThumbs={true}
            thumbWidth={50}
            autoPlay={true}
            interval={5000}
        >
            {imagenes.map((imagen, i) => (
                <ContenedorImagen key={i}>
                    <img src={imagen} />
                </ContenedorImagen>
            ))}
        </Carousel>
    )
}
export default ImgProducto;