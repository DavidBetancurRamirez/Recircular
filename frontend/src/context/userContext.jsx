import { createContext, useContext, useState } from "react"
import axios from "axios"
import { validarEmail, validarPassword } from "../functions/Formularios";


const userContext = createContext();

export const useUser = () => {
    // Para usar el contexto de usuario como un hook
    const context = useContext(userContext)
    if(!context) throw new Error("No hay un provider")
    return context
}

export const UserContextProvider = (props) => {
    const [user, setUser] = useState(null);

    const createUser = async ({ username, email, password }) => {
        try {
            // Validacion de parametros
            const existe = await getUser(username);
            if (existe) return "Este usuario ya existe";

            if (!validarEmail(email)) return "Email no valido";
            if (!validarPassword(password)) return "La contraseña no es valida";

            // Crear nuevo usuario
            const usuario = {
                username,
                email,
                password
            };
            
            await axios.post("/usuarios", usuario);
            
            setUser(usuario);
            return true;
        } catch (error) {
            return "Intentelo más tarde";         
        }
    }
    
    const deleteUser = async (buscar) => {
        try {
            // Buscar usuario en bd
            const usuario = await getUser(buscar);
            if (!usuario) return "El usuario no existe";
    
            // Inactivar usuario
            usuario.activo = false;
            return editUser(usuario);
        } catch (error) {
            return false;
        }
    }
    
    const editUser = async (usuario) => {
        
    }

    const getUser = async (buscar) => {
        try {
            // Se puede obtener por id o por username
            const response = await axios.get("/usuarios/"+buscar);
            return response;
        } catch (error) {
            return false;
        }
    }
    
    const login = async ({ username, password }) => {
        // Obtener usuario
        const usuario = await getUser(username);

        // Validar password
        const iguales = usuario.getPassword===password;

        // En caso de no coincidir devolver mensaje
        if (!usuario || !iguales) return "Username o password no validos";

        setUser(usuario);
        return true;
    }

    return (
        <userContext.Provider
            value={{
                user,
                createUser,
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