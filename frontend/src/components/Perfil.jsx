import { useEffect, useState } from "react";
import Layout from "./Layout";
import styled from "styled-components";
import colores from "../styles/colores";
import { ContenedorSombra, Formulario, Input, Tercio } from "../styles/varios";
import { useUser } from "../context/userContext"
import ImgDefect from "../images/usuario.png"

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
const ContenedorImagen = styled.div`
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: auto;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        z-index: 1;
    }

    input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
        z-index: 2;
    }

    .mensaje {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        opacity: 0;
        transition: opacity 0.3s;
        color: ${colores.azulClaro};
        text-align: center;
    }

    &:hover {
        img { opacity: 0.2;}
        .mensaje { opacity: 1;}
    }
`


const Perfil = () => {
    const [imagen, cambiarImagen] = useState(null)

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
            cambiarImagen(user.img || ImgDefect)
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

    const handleImgSelec = (e) => {
        const file = e.target.files[0];
        if (file) cambiarImagen(URL.createObjectURL(file));
    };

    return (
      <Layout>
        <ContenedorSombra>
          <h2>Mi perfil</h2>
          <Tercio>
            <div className="primera">
                <ContenedorImagen>
                    <img src={imagen || ImgDefect} alt="Imagen de perfil" />
                    <div className="mensaje">Cambiar imagen</div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImgSelec}
                    />
                </ContenedorImagen>
            </div>

            <div className="segunda">
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
  