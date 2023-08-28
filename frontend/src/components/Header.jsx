import styled from "styled-components";
import colores from "../styles/colores";

const Contenedor = styled.div`
background-color: ${colores.azulClaro};
height: 100px;
display: flex;
padding: 10px;
@media (max-width: 700px) {
    height: 80px;
}
`;
const Box = styled.div`
background-color: ${colores.blanco};
height: 100%;  
width: 100%;
border-radius: 15px 15px  15px 15px ;
`;


 

const Header = () => {
    return (
        <Contenedor>
                <Box></Box>
        </Contenedor>
      
    )
}

export default Header