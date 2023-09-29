import { ContenedorScroll } from '../styles/varios';

import styled from "styled-components"
import colores from "../styles/colores"
import { AiOutlineCloseSquare } from "react-icons/ai"

const Contenedor = styled.div`
    > div {
        display: flex;
        align-items: center;
        font-size: 12px;
    }

    @media (max-width: 800px) { margin-top: 20px; }
`
const ContenedorImagen = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px;
    height: 30px;
    border-radius: 10px;
    background-color: ${colores.verdeOscuro};
    color: #fff;
    margin-right: 5px;
    
    p {
        font-size: 10px;
        min-width: 100px;
        margin-right: 10px;
    }

    svg {
        width: 15px;
        height: 15px;
        cursor: pointer;
    }
`
const AgregarImg = styled.label`
    height: 30px;
    border-radius: 20px;
    padding: 5px 10px;
    background-color: ${colores.azulOscuro};
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    transition: 0.5s all ease;
    white-space: nowrap;
    margin-right: 10px;
    transition: 0.5s all ease;

    &:hover { color: ${colores.azulClaro} }
`

const Imagenes = ({ imagenes, cambiarImagenes }) => {
    const handleImgSelec = (e) => {
        const newImages = Array.from(e.target.files);
        cambiarImagenes([...imagenes, ...newImages]);
    };

    const handleRemove = (index) => {
        const updatedImages = [...imagenes];
        updatedImages.splice(index, 1);
        cambiarImagenes(updatedImages);
    };

    return (
        <Contenedor>
            <div>
                <AgregarImg>
                    <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleImgSelec} 
                        style={{ display: "none" }}
                    />
                    Agregar imagen
                </AgregarImg>
                <p>Recomendamos imágenes cuadradas</p>
            </div>
            <ContenedorScroll>
                {imagenes.map((imagen, index) => {
                    return (
                        <div key={index}>
                            <ContenedorImagen>
                                <p>{imagen.name}</p>
                                <AiOutlineCloseSquare onClick={() => handleRemove(index)} />
                            </ContenedorImagen>
                        </div>
                    )
                })}
            </ContenedorScroll>
        </Contenedor>
    )
}

export default Imagenes;