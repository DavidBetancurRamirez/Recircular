import axios from "axios"

import { createContext, useContext, useState } from "react"
import { validarEmail, validarPassword } from "../functions/Formularios";

const API_BASE_URL = 'http://localhost:8000';
const userContext = createContext();

export const useUser = () => {
    const context = useContext(userContext)
    if(!context) throw new Error("No hay un provider")
    return context
}

export const UserContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [nombreUsuario, setNombreUsuario] = useState(localStorage.getItem("nombreUsuario") || "Anonymous");
    const [emailUsuario, setEmailUsuario] = useState(localStorage.getItem("emailUsuario") || "");
    const [phoneUsuario, setPhoneUsuario] = useState(localStorage.getItem("phoneUsuario") || "");
    const [addressUsuario, setAddressUsuario] = useState(localStorage.getItem("addressUsuario") || "");

    const actualizarStorage = (usuario) => {
        localStorage.setItem("userData", usuario.id);
        localStorage.setItem("nombreUsuario", usuario.username)
        localStorage.setItem("emailUsuario", usuario.email)
        console.log(usuario.phone)
        localStorage.setItem("phoneUsuario", usuario.phone)
        localStorage.setItem("addressUsuario", usuario.address)
    };

    const getUser = async () => {
        try {
            const return_id = localStorage.getItem("userData");
            const response = await axios.get(`${API_BASE_URL}/users/${return_id}`);
            return response.data;
        } catch (error) {
            console.error(error)
            return false
        }
    }

    const signUp = async ({ username, email, password, confirmPassword }) => {
        try {
            if (!validarEmail(email)) return "Email no valido";
            if (!validarPassword(password)) return "La contraseña debe contener: Al menos 8 caracteres, Al menos 1 letra mayúscula, Al menos 1 letra minuscula, Al menos 1 número, Al menos un caracter especial";
            if (password != confirmPassword) return "Las contraseñas no coinciden";

            const response = await axios.post(`${API_BASE_URL}/signup`, {
                username,
                email,
                password
            });

            if (response.data == null)  return "Usuario o correo existente";

            const usuario = response.data;
            actualizarStorage(usuario);

            return usuario;
        } catch (error) {
            console.log(error)
            throw new Error("Intentelo más tarde");         
        }
    }
    
    const login = async ({ username, password }) => {
        try {
            if (!validarPassword(password)) return "La contraseña debe contener: \n Al menos 8 caracteres \n Al menos 1 letra mayúscula \n Al menos 1 letra minuscula \n Al menos 1 número \n Al menos un caracter especial";

            const response = await axios.post(
                                `${API_BASE_URL}/login`,
                                { username, password }
            );
            
            if (response.data==null)  return "Username o contraseña incorrectos";
            
            const usuario = response.data;
            console.log(usuario.phone)
            console.log(usuario.address)
            actualizarStorage(usuario);

            return usuario;
        } catch (error) {
            console.log(error)
            throw new Error("Intentelo más tarde");
        }
    }

    const deleteUser = async () => {
        try {
            const response = await axios.put(API_BASE_URL + "/delete/" + id);
            return response ? "Se elimino correctamente" : "Ocurrio un error, intentelo más tarde";
        } catch (error) {
            console.error(error)
            return null;
        }
    }

    const editUser = async ({ username, phone, address }) => {
        try {
            const return_id = localStorage.getItem("userData");

            const response = await axios.put(API_BASE_URL + "/update_profile", {
                "id" : return_id,
                username,
                phone,
                address
            });

            console.log(response)
            actualizarStorage(response.data)

            return response.data;
        } catch (error) {
            console.error(error)
            return null;
        }
    }

    const change_password = async ({ email, old_password, new_password, confirmPassword }) => {
        try {
            if (!validarPassword(new_password)) return "La contraseña debe contener: Al menos 8 caracteres, Al menos 1 letra mayúscula, Al menos 1 letra minuscula, Al menos 1 número,  Al menos un caracter especial";
            if (new_password != confirmPassword) return "Las contraseñas no coinciden";

            const response = await axios.put(
                                `${API_BASE_URL}/change_password`,
                                { email, old_password, new_password }
            );
            
            if (response.data==null)  return "Email o contraseña incorrectos";

            console.log(response.data)
            const usuario = response.data;
            actualizarStorage(usuario);

            return usuario;
        } catch (error) {
            console.log(error)
            throw new Error("Intentelo más tarde");
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
                getUser,
                login,
                setUser,
                addProduct,
                change_password,
                nombreUsuario,
                emailUsuario,
                phoneUsuario,
                addressUsuario,
            }}
        >
            {props.children}
        </userContext.Provider>
    )
}