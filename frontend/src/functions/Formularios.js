
export const validarEmail = (email) => {
    let expresion = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3,4})+$/;

    // Devuelve true si es valida
    return expresion.test(email);
}

export const validarPassword = (password) => {
    /**
        * * Al menos 8 caracteres 
        * * Al menos 1 letra mayuscula
        * * Al menos 1 letra minuscula
        * * Al menos 1 numero
        * * Al menos 1 caracter especial
    */
    let expresion = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    // Devuelve true si la constraseña es segura
    return expresion.test(password);
}