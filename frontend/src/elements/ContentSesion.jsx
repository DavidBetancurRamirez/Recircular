import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext"
import { useMessage } from "../context/messageContext";

import styled from "styled-components";
import colores from "../styles/colores";
import { Formulario, Input } from "../styles/varios";
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

    > form { align-items: center; }
`;
const Logo = styled.img`
    width: 300px;
    margin: 10px auto;

    @media (max-width: 550px) {
        width: 150px;
    }
`;
const ContInput = styled.div`
    width: 400px;
    height: 40px;
    margin: 10px;
    position: relative;

    input { padding-left: 40px; }

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
    // Tamaño de la pantalla
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Estados con la informacion de los inputs
    const [username, cambiarUsername] = useState("");
    const [email, cambiarEmail] = useState("");
    const [password, cambiarPassword] = useState("");

    // Contexto del usuario
    const { createUser, login } = useUser();

    // Contexto de mensaje
    const { newMessage } = useMessage();
    
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        let respuesta;

        try {
            if (inLogin) {
                // ** Pestaña de login ** //
                
                respuesta = await login({ username, password });
            } else {
                // ** Pestaña de sign Up ** //

                // Crear usuario
                respuesta = await createUser({
                    username,
                    email,
                    password
                });
            }

            if (respuesta instanceof String) {
                // En caso de devolver un string es que hubo un error
                newMessage(respuesta, "error")
            } else {
                newMessage(`Bienvenido ${username}`, "exito");
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            newMessage("Intentelo más tarde", "error");
        }
    }

    return (
        <Contenedor>
            <Logo src={windowWidth>=550 ? LogoG : LogoP} alt="Logo Recircular" />
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
                <Boton>{inLogin ? "Login" : "Sign Up"}</Boton>
            </Formulario>
        </Contenedor>
    )
}

export default ContentSesion