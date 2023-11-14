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
        width: 180px;
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
    const [initialLoad, setInitialLoad] = useState(true);
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
        if (initialLoad) {
            setInitialLoad(false);
        } else {
            // Realiza las acciones que deseas al cambiar de ruta después de la carga inicial
            console.log("Cambiaste de ruta después de la carga inicial");
        }
        if (emailUsuario)
            cambiarEmail(emailUsuario)
        if (nombreUsuario)
            cambiarNombre(nombreUsuario)
        if (phoneUsuario)
            cambiarTelefono(phoneUsuario)
        if (addressUsuario)
            cambiarDireccion(addressUsuario)
    }, [nombreUsuario, phoneUsuario, addressUsuario, initialLoad])
    
    const handleActualizar = async () => {
        try {
            const response = await editUser({
                username: nombre,
                phone: telefono,
                address: direccion
            })

            if (typeof respuesta === 'string') newMessage(respuesta, "error");
            else {
                newMessage("Actualización exitosa", "exito")
                window.location.reload()
            }
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
<<<<<<< HEAD
                // Clear localstorage
                navigate("/")
                
=======
                localStorage.clear()
                navigate("/sesion")
>>>>>>> secondary
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
                            placeholder="Nombre de Usuario"
                            value={nombre}
                            onChange={(e) => cambiarNombre(e.target.value)}
                        />
                    </ContenedorInput>

                    <ContenedorInput>
                        <h3>Telefono</h3>
                        <Input
                            name = "Telefono"
                            type="text"
                            placeholder="Telefono"
                            value={telefono}
                            onChange={(e) => cambiarTelefono(e.target.value)}
                        />
                    </ContenedorInput>

                    <ContenedorInput>
                        <h3>Dirrección</h3>
                        <Input
                            name = "Direccion"
                            type="text"
                            placeholder="Dirección"
                            value={direccion}
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
  