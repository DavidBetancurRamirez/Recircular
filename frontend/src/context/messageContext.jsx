import { createContext, useContext, useState, useEffect } from "react"
import styled, {keyframes} from 'styled-components';
import colores from '../styles/colores';

const slideDown = keyframes`
    0% {
        transform: translateY(-1.25rem); /* 20px */
        opacity: 0;
    }
 
    10% {
        transform: translateY(1.25rem);
        opacity: 1;
    }
    
    90% {
        transform: translateY(1.25rem);
        opacity: 1;
    }
 
    100% {
        transform: translateY(1.25rem);
        opacity: 0;
    }
`;
const ContenedorMensaje = styled.div`
    z-index: 1000;
    width: 100%;
    left: 0;
    top: 10px;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${slideDown} 4s ease forwards;
 
    p {
 
        background: ${(props) => {
            if(props.tipo === 'error'){
                return colores.error;
            } else if (props.tipo === 'exito') {
                return colores.exito;
            } else {
                return '#000';
            }
        }};
        color: #fff;
        padding: 18px 30px;
        border-radius: 0.4rem;
        box-shadow: 0px 0px 15px rgba(0,0,0,.1);
        text-align: center;
        font-size: 14px;

        @media (max-width: 500px) {
            padding: 14px 20px;
        }
    }
`;


const messageContext = createContext();

export const useMessage = () => {
    // Para usar el contexto de usuario como un hook
    const context = useContext(messageContext)
    if(!context) throw new Error("No hay un provider")
    return context
}

export const MessageContextProvider = (props) => {
    const [message, setMessage] = useState({
        mensaje: "", 
        tipo: null, 
        visible: false
    })

    useEffect(() => {
        let tiempo

        if(message.visible){
            tiempo = setTimeout(() => {
                setMessage({
                    mensaje: "", 
                    tipo: null, 
                    visible: false
                })
            }, 4000)
        }

        return(() => clearTimeout(tiempo))
    }, [message])

    const newMessage = (mensaje, tipo) => {
        const tipos = ["exito", "error"]

        if (tipos.includes(tipo) && typeof mensaje == "string") {
            setMessage({
                mensaje, 
                tipo, 
                visible: true
            })
        } else {
            console.error("Parametros invalidos")
        }
    }

    return (
        <messageContext.Provider
            value={{
                newMessage
            }}
        >
            {message.visible &&
                <ContenedorMensaje tipo={message.tipo}>
                    <p>{message.mensaje}</p>
                </ContenedorMensaje>
            }
            {props.children}
        </messageContext.Provider>
    )
}