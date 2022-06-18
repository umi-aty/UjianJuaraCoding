import { Switch, Route, Redirect, Router } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import Login from "./pages/login";
import Home from "./pages/home";
import CategoryProduct from "./pages/category";
import Detailproduct from "./pages/detailproduct";
import Register from "./pages/register";
import Cart from "./pages/cart";
import AccountSetting from "./pages/account-setting";
import Transaction from "./pages/transaction";

import Store from "./pages/store";
import Analyse from "./pages/analyse/Analyse";
import Chat from "./pages/consultation/chat";
import Consultation from "./pages/consultation/consultation";

import Header from "./pages/navheader";
import Footer from "./pages/footer";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path={["/", "/home"]} component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/category/:id" component={CategoryProduct} />
        <Route path="/detailproduct/:id" component={Detailproduct} />
        <Route path="/register" component={Register} />
        <Route path="/carts/u/:userId" component={Cart} />
        <Route path="/account-setting/:userId" component={AccountSetting} />
        <Route path="/transactions/:userId" component={Transaction} />

        <Route path="/store" component={Store} />
        <Route path="/chat/u/:userId" component={Chat} />
        <Route path="/consultation/u/" component={Consultation} />
        <Route path="/analyze" component={Analyse} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
