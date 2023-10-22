
import { useState } from "react";
import Layout from "./Layout";
import styled from "styled-components";
import colores from "../styles/colores";
import AgregarImgP from "../elements/AgregarImgP";
import { ContenedorSombra, Formulario, Input, InputFlexible, Tercio } from "../styles/varios";

const ContenedorInput = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
    margin-bottom: 20px;
`
const Boton = styled.button`
    width: 150px;
    height: 30px;
    margin: 25px auto;
    border: none;
    border-radius: 20px;
    color: #fff;
    background-color: ${colores.azulOscuro};
    font-size: 1.1rem;
    cursor: pointer;
    transition: 0.5s all ease;

    &:hover { color: ${colores.azulClaro}; }

    @media (max-width: 800px) { margin: 20px auto; }
`



const Perfil = () => {
    const [imagenes, cambiarImagenes] = useState([])

    const [nombre, cambiarNombre] = useState("");
    const [correo, cambiarCorreo] = useState("");
    const [password, cambiarPassword] = useState("");
    const [telefono, cambiarTelefono] = useState("");
    const [direccion, cambiarDireccion] = useState("");

    return (
      <Layout>
        <ContenedorSombra>
          <h2>Configuracion</h2>
          <Tercio>
          <AgregarImgP imagenes={imagenes} cambiarImagenes={cambiarImagenes} />
          <div>
            <Formulario>
                <div>
                    <h3>Nombre</h3>
                    <Input
                        required 
                        name = "Nombre"
                        type="text"
                        placeholder="Nombre de Usuario"
                        value={nombre}
                        onChange={(e) => cambiarNombre(e.target.value)}
                    />
                </div>

                <div>
                    <h3>Correo</h3>
                    <Input
                        required 
                        name = "Correo"
                        type="email"
                        placeholder="Correo Electronico"
                        value={correo}
                        onChange={(e) => cambiarCorreo(e.target.value)}
                    />
                </div>

                <div>
                    <h3>Contraseña</h3>
                    <Input
                        required 
                        name = "Contrasena"
                        type="password"
                        placeholder="Contrasena"
                        value={password}
                        onChange={(e) => cambiarPassword(e.target.value)}
                    />
                </div>

                <div>
                    <h3>Telefono</h3>
                    <Input
                        required 
                        name = "telefono"
                        type="text"
                        placeholder="Telefono"
                        value={telefono}
                        onChange={(e) => cambiarTelefono(e.target.value)}
                    />
                </div>

                <div>
                    <h3>Dirrección</h3>
                    <Input
                        required 
                        name = "direccion"
                        type="text"
                        placeholder="direccion"
                        value={direccion}
                        onChange={(e) => cambiarDireccion(e.target.value)}
                    />
                </div>

                <Boton>Actualizar</Boton>
                <Boton>Eliminar</Boton>

            </Formulario>
          </div>
          
          </Tercio>
        </ContenedorSombra>
      </Layout>
    )
  }
  
  export default Perfil;
  