import { GlobalStyles } from "./GlobalStyles";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { mobile } from "./responsive";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Payment from "./pages/Steps/Payment";
import PlaceOrder from "./pages/Steps/PlaceOrder";
import Shipping from "./pages/Steps/Shipping";
import Signin from "./pages/Signin";
import SingleProductPage from "./pages/SingleProductPage";
import signup from "./pages/Signup";
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
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/shipping" component={Shipping} />
          <Route exact path="/payment" component={Payment} />
          <Route exact path="/placeorder" component={PlaceOrder} />
          <Route exact path="/signup" component={signup} />
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
  min-height: 50vh;
  ${mobile({ maxWidth: "100vw" })}
`;

const AppWrapper = styled.div``;
