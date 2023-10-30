import axios from "axios"

import { createContext, useContext, useState } from "react"
import { validarEmail, validarPassword } from "../functions/Formularios";

const API_BASE_URL = 'http://localhost:8000';
const userContext = createContext();

export const useUser = () => {
    // Para usar el contexto de usuario como un hook
    const context = useContext(userContext)
    if(!context) throw new Error("No hay un provider")
    return context
}

export const UserContextProvider = (props) => {
    const [user, setUser] = useState(null);

    const actualizarStorage = (usuario) => {
        localStorage.setItem("userData", usuario.id);
        setUser(usuario?.usuario);
    }
    
    const deleteUser = async (id) => {
        try {
            const response = await axios.put(API_BASE_URL + "/delete/" + id);
            return response ? "Se elimino correctamente" : "Ocurrio un error, intentelo más tarde";
        } catch (error) {
            console.error(error)
            return null;
        }
    }
    
    const editUser = async (usuario) => {
        try {
            const response = await axios.put(API_BASE_URL + "/update_profile", usuario);
            actualizarStorage(response)
            return response;
        } catch (error) {
            console.error(error)
            return null;
        }
    }

    const getStorage = async () => {
        try {
            const savedUserData = localStorage.getItem('userData');

            if (savedUserData) {
                const usuario = await getUser(savedUserData)
                if (usuario) setUser(usuario)
            }
        } catch (error) {
            console.error(error)
            console.log("No se pudo recuperar la informacion, vuelva a loguearse")
        }
    }

    const getUser = async (buscar) => {
        try {
            // Se puede obtener por id o por username
            const response = await axios.get(`${API_BASE_URL}/users/${buscar}`);
            return response?.data;
        } catch (error) {
            console.error(error)
            return false
        }
    }
    
    const login = async ({ username, password }) => {
        try {
            if (!validarPassword(password)) return "La contraseña no es valida";

            // SI ES NULL NO SE PUEDE
            const response = await axios.post(
                                `${API_BASE_URL}/login`,
                                { username, password }
            );
            
            if (response==null)  return "Usuario o contraseña incorrectos";

            const usuario = response.usuario;
            actualizarStorage(usuario.id);

            return usuario;
        } catch (error) {
            throw new Error("Intentelo más tarde");
        }
    }

    const signUp = async ({ username, email, password }) => {
        try {
            if (!validarEmail(email)) return "Email no valido";
            if (!validarPassword(password)) return "La contraseña no es valida";

            const response = await axios.post(API_BASE_URL + "/signup", {
                username,
                email,
                password
            });

            if (response==null)  return "Nombre de usuario existente";

            const usuario = response.usuario;
            actualizarStorage(usuario.id);

            return usuario;
        } catch (error) {
            throw new Error("Intentelo más tarde");         
        }
    }

    return (
        <userContext.Provider
            value={{
                user,
                deleteUser,
                editUser,
                getUser,
                getStorage,
                login,
                setUser,
                signUp,
            }}
        >
            {props.children}
        </userContext.Provider>
    )
}