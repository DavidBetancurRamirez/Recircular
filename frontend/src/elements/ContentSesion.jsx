import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext"
import { useMessage } from "../context/messageContext";

import styled from "styled-components";
import colores from "../styles/colores";
import LogoG from "../images/logo2.png";
import LogoP from "../images/logo_blanco.png";
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

const Contenedor = styled.div`
    background-color: ${colores.azulClaro};
    display: flex;
    flex-direction: column;
    padding: 20px;   
    border-radius: 0 0 20px 20px;
`;
const Logo = styled.img`
    width: 300px;
    margin: 10px auto;

    @media (max-width: 550px) {
        width: 150px;
    }
`;
const Formulario = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const ContInput = styled.div`
    width: 400px;
    height: 40px;
    margin: 10px;
    position: relative;

    svg {
        position: absolute;
        height: 30px;
        width: 30px;
        top: 5px;
        left: 5px;
    }

    @media (max-width: 550px) {
        width: 100%;
        height: 100%;
    }
`
const Input = styled.input`
    background-color: #fff;
    opacity: .8;
    border-radius: 10px;
    border: 1px solid #fff;
    outline: none;
    padding: 10px 10px 10px 40px;
    width: 100%;
    height: 100%;
    font-size: 14px;
`
const Boton = styled.button`
    border: none;;
    background: #11111f;
    border-radius: 10px;
    width: 200px;
    height: 50px;
    margin: 20px;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;

    @media (max-width: 550px) {
        width: 150px;
        height: 40px;
    }
`


const ContentSesion = ({ inLogin }) => {
    // Estados con la informacion de los inputs
    const [username, cambiarUsername] = useState("");
    const [email, cambiarEmail] = useState("");
    const [password, cambiarPassword] = useState("");

    // Contexto del usuario
    const { createUser } = useUser();

    // Contexto de mensaje
    const { newMessage } = useMessage();
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (inLogin) {
                newMessage(`Aun no esta el login`, "error")
            } else {
                await createUser(username, email, password);
                newMessage(`Bienvenido ${username}`, "exito")
                navigate("/");
            }
        } catch (error) {
            newMessage(`Ocurrio un error`, "error")
        }
    }

    return (
        <Contenedor>
            <Logo src={window.innerWidth>=550 ? LogoG : LogoP} alt="Logo Recircular" />
            <Formulario  onSubmit={handleSubmit}>
                <ContInput>
                    <Input 
                        required
                        name = "username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => cambiarUsername(e.target.value)}
                    />
                    <FaUserCircle />
                </ContInput>
                {!inLogin &&
                    <ContInput>
                        <Input 
                            required
                            name = "email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => cambiarEmail(e.target.value)}
                        />
                        <MdEmail />
                    </ContInput>
                }
                <ContInput>
                    <Input 
                        required
                        name = "password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => cambiarPassword(e.target.value)}
                    />
                    <RiLockPasswordFill />
                </ContInput>
                <Boton>{inLogin ? "Login" : "Sign in"}</Boton>
            </Formulario>
        </Contenedor>
    )
}

export default ContentSesion