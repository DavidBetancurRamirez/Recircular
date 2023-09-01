import styled from "styled-components";
import colores from "../styles/colores";
import Logo from "../images/logo2.png";
import { GiShoppingCart } from "react-icons/gi"
import { FaUserCircle } from "react-icons/fa";
import { HiAdjustmentsHorizontal, HiMiniMagnifyingGlass } from "react-icons/hi2"

const Contenedor = styled.div`
    background-color: ${colores.azulClaro};
    height: 100px;
    width: 100vw;;
    border-radius: 0 0 15px 15px;
    padding: 5px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
        height: 90px;
        width: 165px;
        cursor: pointer;
    }
`
const ContenedorBusqueda = styled.form`
    display: flex;
    height: 40px;
`
const Filtros = styled.div`
    background-color: ${colores.azulOscuro};
    color: #fff;
    border-radius: 10px 0 0 10px;
    padding: 10px;
    display: flex;
    cursor: pointer;

    svg {
        width: 22px;
        height: 22px;
        margin-left: 15px;
    }
`
const Input = styled.input`
    background-color: #fff;
    opacity: .8;
    border: 1px solid #fff;
    outline: none;
    padding: 10px;
    width: 350px;
    font-size: 14px;
`
const BtnBuscar = styled.button`
    background-color: ${colores.verdeOscuro};
    border: none;
    border-radius: 0 10px 10px 0;
    cursor: pointer;

    svg {
        width: 25px;
        height: 25px;
        margin: 0 10px;
    }
`
const ContenedorUsuario = styled.div`
    display: flex;
    align-items: center;

    svg {
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
`
const Usuario = styled.div`
    display: flex;
    align-items: center;
    margin: 20px;
    cursor: pointer;

    svg {
        width: 30px;
        height: 30px;
        margin: 0 5px;
    }
`


const Header = () => {
    return (
        <Contenedor>
            <img src={Logo} alt="Logo recircular"  />
            <ContenedorBusqueda>
                <Filtros>
                    Filtros
                    <HiAdjustmentsHorizontal />
                </Filtros>
                <Input />
                <BtnBuscar>
                    <HiMiniMagnifyingGlass />
                </BtnBuscar>
            </ContenedorBusqueda>
            <ContenedorUsuario>
                <Usuario>
                    Anonimus
                    <FaUserCircle />
                </Usuario>
                <GiShoppingCart />
            </ContenedorUsuario>
        </Contenedor>
    )
}

export default Header;