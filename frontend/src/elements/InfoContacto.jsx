import styled from "styled-components";
import Img from "../images/Producto/primadera.jpg";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import Rating from "@mui/material/Rating";

const Contenedor = styled.article`
    display: flex;

    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-right: 10px;
    }

    .estrellas {
        font-size: 20px;

        .MuiRating-iconFilled,
        .MuiRating-iconEmpty {
            font-size: 20px;
        }
    }
`
const Info = styled.div`
    display: flex;
    align-items: center;
    margin: 5px 0;

    svg {
        width: 18px;
        height: 18px;
        margin-right: 5px;
    }
`

const InfoContacto = ({ nombre_usuario, email, telefono }) => {
    return (
        <Contenedor>
            <img src={Img} alt="Imagen Primadera" />
            <div>
                <h3>{nombre_usuario}</h3>
                <Rating
                    value={4.5} 
                    precision={0.5}
                    readOnly
                    className="estrellas"
                />
                <Info><MdEmail />{email}</Info>
                <Info><BsFillTelephoneFill />{telefono}</Info>
            </div>
        </Contenedor>
    )
}

export default InfoContacto;