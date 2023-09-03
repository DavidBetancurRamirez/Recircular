import styled from "styled-components";
import Header from "../elements/Header";
import Footer from "../elements/Footer";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Content = styled.div`
    flex-grow: 1;
`;


const Layout = ({ children }) => {
    // Para colocar el Header y el footer en la pagina
    return (
        <Wrapper>
            <Header />
            <Content>{children}</Content>
            <Footer />
        </Wrapper>
    );
};

export default Layout;
