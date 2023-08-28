import MaintContentGrid from "./elements/MaintContentGrid";
import Header from "./components/Header";
import Footer from "./components/Footer";

import styled from "styled-components";
import colores from "./styles/colores";

const Fondo = styled.div`
background-color: ${colores.materiales.algodon};
width: 100vw;
height: 100vh;
`;

const Contenedor = styled.div`

margin: auto;
width: 100%;
max-width: 1600px;
height: 100%;
`;


const App = () => {

  return (
    <Fondo>
       <Contenedor>
       <Header></Header>
       <MaintContentGrid></MaintContentGrid>
       <Footer></Footer>
       </Contenedor>
    </Fondo>
  )
}

export default App
