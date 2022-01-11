import { GlobalStyles } from "./GlobalStyles";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { mobile } from "./responsive";
import AdminRoute from "./components/AdminRoute";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import NewProduct from "./pages/admin/editProduct";
import OrderConfirm from "./pages/OrderConfirm";
import OrderHistory from "./pages/OrderHistory";
import Payment from "./pages/Steps/Payment";
import PlaceOrder from "./pages/Steps/PlaceOrder";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import Shipping from "./pages/Steps/Shipping";
import Signin from "./pages/Signin";
import SingleProductPage from "./pages/SingleProductPage";
import productsList from "./pages/admin/productsList";
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
          <Route exact path="/orderhistory" component={OrderHistory} />
          <PrivateRoute exact path="/productslist" component={productsList} />
          <AdminRoute exact path="/profile" component={Profile} />
          <AdminRoute exact path="/product/:id/edit" component={NewProduct} />
          <Route exact path="/placeorder" component={PlaceOrder} />
          <Route exact path="/signup" component={signup} />
          <Route exact path="/order/:id" component={OrderConfirm} />
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
