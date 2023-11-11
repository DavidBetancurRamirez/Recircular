import { createContext, useContext, useState } from "react"


const loadingContext = createContext();

export const useLoading = () => {
    // Para usar el contexto de usuario como un hook
    const context = useContext(loadingContext)
    if(!context) throw new Error("No hay un provider")
    return context
}

export const LoadingContextProvider = (props) => {
    const [loading, setLoading] = useState(true)

    return (
        <loadingContext.Provider
            value={{
                loading,
                setLoading
            }}
        >
            {props.children}
        </loadingContext.Provider>
    )
}