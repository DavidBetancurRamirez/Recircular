import { useEffect, useState } from "react";
import Layout from "./Layout";
import styled from "styled-components";
import colores from "../styles/colores";
import AgregarImgP from "../elements/AgregarImgP";
import { ContenedorSombra, Formulario, Input, Tercio } from "../styles/varios";
import { useUser, UserContextProvider } from "../context/userContext"
import { useMessage } from "../context/messageContext";
import { useNavigate } from "react-router-dom";

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

    const [email, cambiarEmail] = useState("")
    const [password, cambiarPassword] = useState("");
    const [nombre, cambiarNombre] = useState("");
    const [telefono, cambiarTelefono] = useState("");
    const [direccion, cambiarDireccion] = useState("");

    const { deleteUser, editUser } = useUser();
    const { nombreUsuario, emailUsuario, phoneUsuario, addressUsuario } = useUser();

    const { newMessage } = useMessage();

    const navigate = useNavigate();

    useEffect(() => {
        if (emailUsuario)
            cambiarEmail(emailUsuario)
    })
    
    const handleActualizar = async () => {
        try {
            console.log(nombre)
            if (nombre == "")
                cambiarNombre(nombreUsuario)
            if (telefono == "")
                cambiarTelefono(phoneUsuario)
            if (direccion == "")
                cambiarDireccion(addressUsuario)
            console.log(nombre)

            const response = await editUser({
                username: "Loperatomas",
                phone: telefono,
                address: direccion
            })

            if (typeof respuesta === 'string') newMessage(respuesta, "error");
            else newMessage("Actualización exitosa", "exito")
        } catch (error) {
            console.error(error)
        }
    }

    const handleEliminar = async () => {
        try {
            const response = await deleteUser()
            if (typeof respuesta === 'string') newMessage(respuesta, "error");
            else{
                newMessage("Eliminacion exitosa", "exito")
                // Clear localstorage
                navigate("/")
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
      <Layout>
        <ContenedorSombra>
          <h2>Mi perfil</h2>
          <Tercio>
            <AgregarImgP imagenes={imagenes} cambiarImagenes={cambiarImagenes} />
            <div>
                <Formulario onSubmit={(e) => e.preventDefault()}>
                    <ContenedorInput>
                        <h3>Correo</h3>
                        <Input 
                            name = "Correo"
                            type="email"
                            placeholder="Correo Electronico"
                            value={email}
                            disabled
                        />
                    </ContenedorInput>

                    <ContenedorInput>
                        <h3>Contraseña</h3>
                        <Input
                            name = "Contrasena"
                            type="password"
                            placeholder="******************"
                            value={password}
                            onChange={(e) => cambiarPassword(e.target.value)}
                            disabled
                        />
                    </ContenedorInput>

                    <ContenedorInput>
                        <h3>Nombre</h3>
                        <Input
                            name = "Nombre"
                            type="text"
                            placeholder={nombreUsuario}
                            onChange={(e) => cambiarNombre(e.target.value)}
                        />
                    </ContenedorInput>

                    <ContenedorInput>
                        <h3>Telefono</h3>
                        <Input
                            name = "telefono"
                            type="text"
                            placeholder={phoneUsuario != "" ? phoneUsuario : "Telefono"}
                            onChange={(e) => cambiarTelefono(e.target.value)}
                        />
                    </ContenedorInput>

                    <ContenedorInput>
                        <h3>Dirrección</h3>
                        <Input
                            name = "Direccion"
                            type="text"
                            placeholder={addressUsuario != "" ? addressUsuario : "Dirección"}
                            onChange={(e) => cambiarDireccion(e.target.value)}
                        />
                    </ContenedorInput>

                    <ContenedorBotones>
                        <button className="actualizar" onClick={handleActualizar} >Actualizar</button>
                        <button onClick={() => navigate("/cambio")}>Cambiar Contraseña</button>
                        <button onClick={handleEliminar}>Eliminar</button>
                    </ContenedorBotones>

                </Formulario>
            </div>
          
          </Tercio>
        </ContenedorSombra>
      </Layout>
    )
  }
  
  export default Perfil;
  