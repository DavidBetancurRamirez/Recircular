import { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import styled from "styled-components";
import { useMessage } from "../context/messageContext";
import { useUser } from "../context/userContext";
// import Imagen from "../images/carrusel/parqueadero2.jpg";
import LogoG from "../images/logo2.png";
import LogoP from "../images/logo_blanco.png";
import colores from "../styles/colores";
import { Formulario, Input } from "../styles/varios";
import { useNavigate } from "react-router-dom";

const Fondo = styled.div`
    background-color: ${colores.azulClaro};
    background-size: cover;
    background-position: center center;
    background-attachment: fixed;
    width: 100vw;
    height: 100vh;
    padding: 80px;

    @media (max-width: 800px) { padding: 30px; }
`

const Header = styled.button`
    background-color: ${props => (props.$inLogin ? colores.moradoClaro : colores.oscuro)};
    cursor: ${props => (props.$inLogin ? "auto" : "pointer")};
    width: 50%;
    height: 100%;
    border: none;
    border-radius: 10px 10px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    font-weight: bold;
    color: #fff;
`;

const Contenedor1= styled.div`
    margin: auto;
    max-width: 1000px;
    width: 100%;
    border-radius:  20px;
`;
const Contenedor = styled.div`
    background-color: ${colores.moradoClaro};
    display: flex;
    flex-direction: column;
    padding: 20px;
   
    border-radius: 20px 20px;

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
    font-size: 1.2rem;
    cursor: pointer;
    transition: 0.5s all ease;

    &:hover { color: ${colores.moradoClaro}; }

    @media (max-width: 550px) {
        width: 150px;
        height: 40px;
    }
`


const CambioC = () => {
 const [windowWidth, setWindowWidth] = useState(window.innerWidth);

 const [email, cambiarEmail] = useState("");
 const [old_password, cambiarOldPassword] = useState("");
 const [new_password, cambiarNewPassword] = useState("");
 const [confirmPassword, confirmarPassword] = useState("");

 const { change_password } = useUser()

 const { newMessage } = useMessage();

 const navigate = useNavigate();
 
 const handleSubmit = async (e) => {
    e.preventDefault();
    let respuesta;  
    try {   
            respuesta = await change_password({ 
                email: email,
                new_password: new_password,
                old_password: old_password,
                confirmPassword: confirmPassword
            })
            if (typeof respuesta === "string") newMessage(respuesta, "error");
            else {
                newMessage("Cambio de contraseña exitoso", "exito");
                // Clear localstorage
                navigate("/sesion")
            } 
    } catch (error) {
        console.log(error)
        newMessage("Intentelo más tarde", "error");
    }
}
  
    return (
     <Fondo> 
        <Contenedor1>
        <Contenedor>
            <Logo src={windowWidth>550 ? LogoG : LogoP} alt="Logo ParkHub" />
            <Formulario onSubmit={handleSubmit}>      
                <ContInput>
                    <Input 
                        required
                        name = "email"
                        type="email"
                        placeholder="Correo Electronico"
                        value={email}
                        onChange={(e) => cambiarEmail(e.target.value)}
                    />
                    <MdEmail />
                </ContInput>
                <ContInput>
                    <Input 
                        required
                        name = "password"
                        type="password"
                        placeholder="Contraseña Vieja"
                        value={old_password}
                        onChange={(e) => cambiarOldPassword(e.target.value)}
                    />
                    <RiLockPasswordFill />
                </ContInput>
                <ContInput>
                    <Input 
                        required
                        name = "password"
                        type="password"
                        placeholder="Contraseña Nueva"
                        value={new_password}
                        onChange={(e) => cambiarNewPassword(e.target.value)}
                    />
                    <RiLockPasswordFill />
                </ContInput>
                <ContInput>
                        <Input 
                            required
                            name = "password"
                            type="password"
                            placeholder="Confirmar Contraseña"
                            value={confirmPassword}
                            onChange={(e) => confirmarPassword(e.target.value)}
                        />
                        <RiLockPasswordFill />
                    </ContInput>
                    
                <Boton>Confirmar</Boton>
                
            </Formulario>
        </Contenedor>
        </Contenedor1>
        </Fondo>
    )
}

export default CambioC;