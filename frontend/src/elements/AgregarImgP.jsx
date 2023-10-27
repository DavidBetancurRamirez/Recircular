
import styled from "styled-components"
import colores from "../styles/colores"
import { AiOutlineCloseSquare } from "react-icons/ai"

const Contenedor = styled.div`

    > div {
        display: flex;
        align-items: center;
    }
    @media (max-width: 800px) { margin-top: 20px; }
`

const AgregarImg = styled.label`
    height: 30px;
    border-radius: 20px;
    padding: 5px 10px;
    align-items: center;
    background-color: ${colores.azulOscuro};
    color: #fff;
    font-size: 0.9rem;
    cursor: pointer;
    transition: 0.5s all ease;
    white-space: nowrap;
    transition: 0.5s all ease;
    display: flex;

    &:hover { color: ${colores.azulClaro} }

    input { display: none; }
`

const AgregarImgP = ({ imagenes, cambiarImagenes }) => {
    const handleImgSelec = (e) => {
        const newImages = Array.from(e.target.files);
        cambiarImagenes([...imagenes, ...newImages]);
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
                    Agregar PP
                </AgregarImg>

            </div>
            
        </Contenedor>
    )
}

export default AgregarImgP;