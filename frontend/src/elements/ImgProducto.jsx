import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Img1 from "../images/Producto/aserrin.jpg"
import Img2 from "../images/Producto/aserrin1.jpg"
import Img3 from "../images/Producto/aserrin2.jpg"
import { useEffect } from "react";
import { useUser, UserContextProvider } from "../context/userContext"
import { useMessage } from "../context/messageContext";
import { getFile } from "../firebase/config"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ContenedorImagen = styled.article`
    height: 300px;
    width: 100%;

    img { width: 100%; }

    @media (max-width: 800px) { height: 300px; }
    @media (max-width: 500px) { height: 250px; }
`


const ImgProducto = ({imagenes = []}) => {
    
    const { getUser } = useUser();
    const { newMessage } = useMessage();
    const [ archivos, setArchivos ] = useState('')

    useEffect(() => {
        const get_imagenes = async () => {
            var storage = []
            const imageContainer = document.getElementById(`imageContainer-${imagenes}`);
            for (var i = 0; i < imagenes.length; i++) {
                storage.push(await getFile(imagenes[i]))
                imageContainer.appendChild(storage[i])
            }
            setArchivos(storage)
        }
        get_imagenes();
    }, [getFile, getUser]);

    return (
        <Carousel
            infiniteLoop={true}
            showIndicators={true}
            showThumbs={true}
            thumbWidth={50}
            autoPlay={true}
            interval={5000}
        >
            <ContenedorImagen id={`imageContainer-${imagenes}`}>
            </ContenedorImagen>
        </Carousel>
    )
}
export default ImgProducto;