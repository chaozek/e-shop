import { GlobalStyles } from "./GlobalStyles";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { mobile } from "./responsive";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import SingleProductPage from "./pages/SingleProductPage";
import Slider from "./components/Slider";
import styled from "styled-components";
export default function App() {
  return (
    <AppWrapper>
      <Router>
        <GlobalStyles />
        <Header />
        <Route exact path="/" component={Homepage} />
        <Container>
          <Route exact path="/cart/:id?" component={Cart} />
          <Route exact path="/product/:id" component={SingleProductPage} />
        </Container>
      </Router>
      <Footer />
    </AppWrapper>
  );
}
export const Container = styled.div`
  margin: 0 auto;
  max-width: 80vw;
  ${mobile({ maxWidth: "100vw" })}
`;

const AppWrapper = styled.div`
  position: relative;
`;
