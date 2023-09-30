import styled from "styled-components";
import colores from "./colores";


export const ContenedorPrincipal = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 20px auto;
    width: 90%;
    max-width: 1000px;
`
export const ContenedorSombra = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 20px;
    margin: 20px 0;
    padding: 10px 20px;
    background: linear-gradient(315deg, #ffffff, ${colores.gris});
    box-shadow:  -5px -5px 10px #cecece,
                10px 10px 10px #ffffff;

    h2 {
        width: 100%;
        text-align: center;
        font-size: 20px;
        margin-bottom: 20px;
    }
`

export const Formulario = styled.form`
    display: flex;
    flex-direction: column;

    h3 {
        font-weight: 700;
        font-size: 15px;
        margin-right: 10px;
    }
`

export const Input = styled.input`
    background-color: #fff;
    opacity: .8;
    border-radius: 10px;
    border: 1px solid #fff;
    outline: none;
    padding: 10px;
    width: 100%;
    height: 100%;
    font-size: 14px;
`

export const InputFlexible = styled.textarea`
    width: 100%;
    min-height: 100px;
    resize: vertical;
    outline: none;
    background-color: #fff;
    opacity: .8;
    border-radius: 10px;
    border: 1px solid #fff;
    padding: 10px;
    font-size: 14px;
    margin-top: 5px;
`;

export const ContenedorScroll = styled.article`
    display: flex;
    width: 90%;
    white-space: nowrap;
    overflow-x: auto;

    > div { margin-top: 10px; }

    @media (max-width: 800px) { width: 100%; }
`

export const Mitad = styled.div`
    display: flex;
    margin-bottom: 20px;

    > div { width: 50%; }

    @media (max-width: 800px) {
        flex-direction: column;
        > div { width: 100% }
    }
`