
import { useState } from "react";
import Layout from "./Layout";
import styled from "styled-components";
import colores from "../styles/colores";
import AgregarImgP from "../elements/AgregarImgP";
import { ContenedorSombra, Formulario, Input, Tercio } from "../styles/varios";

const ContenedorInput = styled.div`
    margin: 5px 0;
`
const ContenedorBotones = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 20px;

    button {
        width: 150px;
        height: 30px;
        border: none;
        border-radius: 20px;
        color: #fff;
        background-color: ${colores.azulOscuro};
        font-size: 1.1rem;
        cursor: pointer;
        transition: 0.5s all ease;

        &:hover { background-color: ${colores.error}; }
    }

    .actualizar {
        &:hover { background-color: ${colores.exito}; }
    }
`


const Perfil = () => {
    const [imagenes, cambiarImagenes] = useState([])

    const [nombre, cambiarNombre] = useState("");
    const [password, cambiarPassword] = useState("");
    const [telefono, cambiarTelefono] = useState("");
    const [direccion, cambiarDireccion] = useState("");

    return (
      <Layout>
        <ContenedorSombra>
          <h2>Mi perfil</h2>
          <Tercio>
            <AgregarImgP imagenes={imagenes} cambiarImagenes={cambiarImagenes} />
            <div>
                <Formulario>
                    <ContenedorInput>
                        <h3>Correo</h3>
                        <Input
                            required 
                            name = "Correo"
                            type="email"
                            placeholder="Correo Electronico"
                            value={"correo@correo.com"}
                            disabled
                        />
                    </ContenedorInput>

                    <ContenedorInput>
                        <h3>Nombre</h3>
                        <Input
                            required 
                            name = "Nombre"
                            type="text"
                            placeholder="Nombre de Usuario"
                            value={nombre}
                            onChange={(e) => cambiarNombre(e.target.value)}
                        />
                    </ContenedorInput>

                    <ContenedorInput>
                        <h3>Contraseña</h3>
                        <Input
                            required 
                            name = "Contrasena"
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => cambiarPassword(e.target.value)}
                        />
                    </ContenedorInput>

                    <ContenedorInput>
                        <h3>Telefono</h3>
                        <Input
                            required 
                            name = "telefono"
                            type="text"
                            placeholder="Telefono"
                            value={telefono}
                            onChange={(e) => cambiarTelefono(e.target.value)}
                        />
                    </ContenedorInput>

                    <ContenedorInput>
                        <h3>Dirrección</h3>
                        <Input
                            required 
                            name = "direccion"
                            type="text"
                            placeholder="direccion"
                            value={direccion}
                            onChange={(e) => cambiarDireccion(e.target.value)}
                        />
                    </ContenedorInput>

                    <ContenedorBotones>
                        <button className="actualizar" >Actualizar</button>
                        <button>Eliminar</button>
                    </ContenedorBotones>

                </Formulario>
            </div>
          
          </Tercio>
        </ContenedorSombra>
      </Layout>
    )
  }
  
  export default Perfil;
  