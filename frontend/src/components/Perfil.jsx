import { useEffect, useState } from "react";
import Layout from "./Layout";
import styled from "styled-components";
import colores from "../styles/colores";
import AgregarImgP from "../elements/AgregarImgP";
import { ContenedorSombra, Formulario, Input, Tercio } from "../styles/varios";
import { useUser } from "../context/userContext"

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

    const [password, cambiarPassword] = useState("");
    const [nombre, cambiarNombre] = useState("");
    const [telefono, cambiarTelefono] = useState("");
    const [direccion, cambiarDireccion] = useState("");

    const { user, deleteUser, editUser } = useUser();

    useEffect(() => {
        if (user) {
            cambiarNombre(user.username)
            cambiarTelefono(user.phone)
            cambiarDireccion(user.address)
        }
    }, [user])
    
    const handleActualizar = async () => {
        try {
            const response = await editUser({
                username: nombre,
                phone: telefono,
                address: direccion,
            })
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    const handleEliminar = async () => {
        try {
            const response = await deleteUser(user.id)
            console.log(response)
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
                            value={user?.email}
                            disabled
                        />
                    </ContenedorInput>

                    <ContenedorInput>
                        <h3>Contraseña</h3>
                        <Input
                            name = "Contrasena"
                            type="password"
                            placeholder="****************"
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
                            name = "direccion"
                            type="text"
                            placeholder="direccion"
                            value={direccion}
                            onChange={(e) => cambiarDireccion(e.target.value)}
                        />
                    </ContenedorInput>

                    <ContenedorBotones>
                        <button className="actualizar" onClick={handleActualizar} >Actualizar</button>
                        <button onClick={handleActualizar}>Eliminar</button>
                    </ContenedorBotones>

                </Formulario>
            </div>
          
          </Tercio>
        </ContenedorSombra>
      </Layout>
    )
  }
  
  export default Perfil;
  