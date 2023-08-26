import styled from "styled-components";
import colores from "../styles/colores";
import PropTypes from 'prop-types';

const Contenedor = styled.div`
    height: 60px;
    display: flex;
`;
const Header = styled.button`
    background-color: ${props => (props.inLogin ? colores.azulClaro : colores.azulOscuro)};
    cursor: ${props => (props.inLogin ? "" : "pointer")};
    width: 500px;
    height: 60px;
    border: none;
    border-radius: 10px 10px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
`;


const HeaderSesion = ({ inLogin, cambiarInLogin }) => {
    return (
        <Contenedor>
            <Header inLogin={inLogin} onClick={() => cambiarInLogin(true)}>Login</Header>
            <Header inLogin={!inLogin} onClick={() => cambiarInLogin(false)}>Sign in</Header>
        </Contenedor>
    )
}

HeaderSesion.propTypes = {
    inLogin: PropTypes.bool,
    cambiarInLogin: PropTypes.func
};

export default HeaderSesion