import styled from "styled-components";
import { Input } from "../styles/varios";
import { AiFillCloseCircle, AiFillPlusCircle } from "react-icons/ai"
import colores from "../styles/colores";

const ContenedorInput = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 30px;
    margin: 5px 0;
`
const ContenedorBotones = styled.article`
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 20px;
        height: 20px;
        margin-left: 5px;
        cursor: pointer;
    }
`


const Caracteristicas = ({ caracteristicas, cambiarCaracteristicas }) => {
    const agregarCaracteristica = () => {
        cambiarCaracteristicas([...caracteristicas, ""]);
    };
  
    const eliminarCaracteristica = (index) => {
        if (caracteristicas.length>1) {
            const nuevasCaracteristicas = [...caracteristicas];
            nuevasCaracteristicas.splice(index, 1);
            cambiarCaracteristicas(nuevasCaracteristicas);
        }
    };
  
    const actualizarCaracteristica = (index, valor) => {
        const nuevasCaracteristicas = [...caracteristicas];
        nuevasCaracteristicas[index] = valor;
        cambiarCaracteristicas(nuevasCaracteristicas);
    };

    return (
        <div>
            <h3>Caracteristicas</h3>
            {caracteristicas.map((caracteristica, index) => (
                <ContenedorInput key={index}>
                    <Input
                        type="text"
                        placeholder={`Característica ${index + 1}`}
                        value={caracteristica}
                        onChange={(e) => actualizarCaracteristica(index, e.target.value)}
                    />
                    <ContenedorBotones>
                        <AiFillCloseCircle style={{ color: colores.error }} onClick={() => eliminarCaracteristica(index)} />
                        <AiFillPlusCircle style={{ color: colores.verdeOscuro }} onClick={agregarCaracteristica} />
                    </ContenedorBotones>
                </ContenedorInput>
            ))}
    </div>
    )
}

export default Caracteristicas;