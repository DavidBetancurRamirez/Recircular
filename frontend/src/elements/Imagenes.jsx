import { ContenedorScroll } from '../styles/varios';

import styled from "styled-components"
import colores from "../styles/colores"
import { AiOutlineCloseSquare } from "react-icons/ai"

const Contenedor = styled.div`
    > div {
        display: flex;
        align-items: center;
    }

    .comentario { 
        font-size: 0.9rem;
        font-weight: lighter;
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
        font-size: 0.8rem;
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
    font-size: 0.9rem;
    cursor: pointer;
    transition: 0.5s all ease;
    white-space: nowrap;
    margin-right: 10px;
    transition: 0.5s all ease;
    display: grid;
    place-items: center;

    &:hover { color: ${colores.azulClaro} }

    input { display: none; }
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
                    />
                    Agregar imagen
                </AgregarImg>
                <p className='comentario'>Recomendamos imágenes cuadradas</p>
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