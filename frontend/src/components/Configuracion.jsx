
import Layout from "./Layout";

import { ContenedorSombra, Formulario, Input, InputFlexible, Mitad } from "../styles/varios";


const ContenedorInput = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
    margin-bottom: 20px;
`




const Configuracion = () => {
    return (
      <Layout>
        <ContenedorSombra>
        <h2>Configuración</h2>
        </ContenedorSombra>
      </Layout>
    )
  }
  
  export default Configuracion;
  