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

    const signUp = async ({ username, email, password }) => {
        try {
            if (!validarEmail(email)) return "Email no valido";
            if (!validarPassword(password)) return "La contraseña no es valida";

            // Crear nuevo usuario
            const usuario = {
                username,
                email,
                password
            };
            // SI es null es que usuario o contraseña ya existen
            const response = await axios.post(API_BASE_URL + "/signup", usuario);
            
            setUser(usuario);
            return usuario;
        } catch (error) {
            throw new Error("Intentelo más tarde");         
        }
    }
    
    const deleteUser = async (id) => {
        try {
            const response = await axios.put(API_BASE_URL + "/delete/" + id);
            return true;
        } catch (error) {
            return false;
        }
    }
    
    const editUser = async (usuario) => {
        try {
            const response = await axios.put(API_BASE_URL + "/update_profile", usuario);
            return true;
        } catch (error) {
            return false;
        }
    }

    const getUser = async (buscar) => {
        try {
            // Se puede obtener por id o por username
            const response = await axios.get(`${API_BASE_URL}/users/${buscar}`);
            return response?.data;
        } catch (error) {
            return null
        }
    }
    
    const login = async ({ username, password }) => {
        try {
            // SI ES NULL NO SE PUEDE
            const usuario = await axios.post(
                            `${API_BASE_URL}/login`,
                            { username, password });
            
            console.log(usuario)
            setUser(usuario.data);
            return usuario.data;
        } catch (error) {
            throw new Error("Intentelo más tarde");
        }
    }

    return (
        <userContext.Provider
            value={{
                user,
                signUp,
                deleteUser,
                editUser,
                getUser,
                login,
                setUser
            }}
        >
            {props.children}
        </userContext.Provider>
    )
}