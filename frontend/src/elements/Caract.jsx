import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useEffect } from "react";
import { useUser, UserContextProvider } from "../context/userContext"
import { useMessage } from "../context/messageContext";
import { getFile } from "../firebase/config"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ContCaracteristicas = styled.div`
    margin: 10px 0;

    ul {
        list-style: none; /* Quita las viñetas predeterminadas */
        margin-top: 5px;
    }

    li {
        margin-left: 20px;
        position: relative;
    }

    li::before {
        content: "•";
        color: #000;
        font-size: 16px;
        position: absolute;
        left: -15px;
        top: 0;
    }
`

const Caracteristicas = ({c = []}) => {
    const [ caracteristicas, setCaracteristicas ] = useState([])

    useEffect(() => {
        const get_caracteristicas = async () => {
            var storage = []
            console.log(c)
            for (var i = 0; i < c.length; i++) {
                storage.push(c[i])
            }
            setCaracteristicas(storage)
        }
        get_caracteristicas();
    }, []);

    return (
        <ContCaracteristicas>
            <h3>Caracteristicas</h3>
            <ul>
                {caracteristicas.map((caracteristica, index) => (
                    <li key={index}>{caracteristica}</li>
                ))}
            </ul>
        </ContCaracteristicas>
    )
}

export default Caracteristicas;