import { useState, useEffect } from "react";
import Volver from "./Volver";

/*
    Para agregar el boton volver en la pestaña
    y reducir codigo en estos archivos
*/


const BtnVolver = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        // Agregar el evento de cambio de tamaño de ventana
        window.addEventListener('resize', handleResize);

        // Limpieza del efecto al desmontar el componente
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {windowWidth>800 &&
                <Volver />
            }
        </>
    )
}

export default BtnVolver;