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
    const [uuid, setUuid] = useState('');

    const actualizarStorage = (usuario) => {
        localStorage.setItem("userData", usuario.id);
        setUser(usuario?.usuario);
        setUuid(usuario.id)
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

            if (response.data == null)  return "Nombre de usuario existente";

            const usuario = response.data;
            actualizarStorage(usuario.id);

            setUser(usuario)

            return usuario;
        } catch (error) {
            throw new Error("Intentelo más tarde");         
        }
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
    
// Carrera 45 # 78 , 1702

    const editUser = async (usuario) => {
        try {
            console.log(uuid)
            const response = await axios.put(API_BASE_URL + "/update_profile", usuario);
            console.log(response)
            actualizarStorage(response.data)

            setUser(response)

            return response;
        } catch (error) {
            console.error(error)
            return null;
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
            
            if (response.data == null)  return "Usuario o contraseña incorrectos";

            const usuario = response.data;
            actualizarStorage(usuario);

            setUser(usuario)

            return usuario;
        } catch (error) {
            console.log(error)
            throw new Error("Intentelo más tarde");
        }
    }

    const getStorage = async () => {
        try {
            return_id = localStorage.getItem("userData");
            setUuid(return_id)
            return return_id
        } catch (error) {
            console.error(error)
            console.log("No se pudo recuperar la informacion, vuelva a loguearse")
        }
    }

    const addProduct = async ( id, product) => {
        try {

            const response = await axios.post(`${API_BASE_URL}/add_product`, 
                                id, 
                                product
                                );

            if (response.data == null)  return "Producto no creado";

            return response.data;
        } catch (error) {
            console.error(error)
            console.log("Intentelo más tarde")
        }
    }

    return (
        <userContext.Provider
            value={{
                user,
                signUp,
                deleteUser,
                editUser,
                getStorage,
                getUser,
                login,
                setUser,
                addProduct
            }}
        >
            {props.children}
        </userContext.Provider>
    )
}