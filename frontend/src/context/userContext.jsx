import { createContext, useContext, useState } from "react"


const userContext = createContext();

export const useUser = () => {
    // Para usar el contexto de usuario como un hook
    const context = useContext(userContext)
    if(!context) throw new Error("No hay un provider")
    return context
}

export const UserContextProvider = (props) => {
    const [user, setUser] = useState(null);

    const getUser = async (usuario) => {
        
    }

    const createUser = async (username, email, password) => {
        console.log(username, email, password)
    }

    const editUser = async (usuario) => {
        
    }

    const deleteUser = async (usuario) => {
        
    }

    return (
        <userContext.Provider
            value={{
                user,
                createUser,
                editUser,
                deleteUser,
                getUser
            }}
        >
            {props.children}
        </userContext.Provider>
    )
}