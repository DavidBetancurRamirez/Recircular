import styled from "styled-components";
import colores from "../styles/colores";
import PropTypes from 'prop-types';
import Logo from "../images/logo2.png"
import { FaUserCircle } from "react-icons/fa"
import { RiLockPasswordFill } from "react-icons/ri"
import { MdEmail } from "react-icons/md"

const Contenedor = styled.div`
    background-color: ${colores.azulClaro};
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-radius: 0 0 20px 20px;

    img {
        width: 300px;
        margin: 10px auto;
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
`

const ContentSesion = ({ inLogin }) => {
    return (
        <Contenedor>
            <img src={Logo} alt="Logo Recircular" />
            <Formulario>
                <ContInput>
                    <Input placeholder="Username" /><FaUserCircle />
                </ContInput>
                {!inLogin &&
                    <ContInput>
                        <Input placeholder="Email" /><MdEmail />
                    </ContInput>
                }
                <ContInput>
                    <Input placeholder="Password" /><RiLockPasswordFill />
                </ContInput>
                <Boton>{inLogin ? "Login" : "Sign in"}</Boton>
            </Formulario>
        </Contenedor>
    )
}

ContentSesion.propTypes = {
    inLogin: PropTypes.bool
};

export default ContentSesion