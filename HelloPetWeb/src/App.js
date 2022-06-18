import React, { Component } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
// import { Switch, Route } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import AuthService from "./services/auth.service";

// import Home from "./components/home.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import ListCategory from "./components/admin.dashboard.component/categories.component/list-categories.component";
import AddCategory from "./components/admin.dashboard.component/categories.component/add-categories.component";
import UpdateCategory from "./components/admin.dashboard.component/categories.component/update-categories.component";
import ListProduct from "./components/admin.dashboard.component/products.component/list-products.component";
import AddProduct from "./components/admin.dashboard.component/products.component/add-products.component";
import UpdateProduct from "./components/admin.dashboard.component/products.component/update-products.component";
import ListProductGallery from "./components/admin.dashboard.component/product-galleries.component/list-product-galleries.component";
import AddProductGallery from "./components/admin.dashboard.component/product-galleries.component/add-product-galleries.component";
import ListUser from "./components/admin.dashboard.component/users.component/list-users.component";
import UpdateUser from "./components/admin.dashboard.component/users.component/update-users.component";

import ListDoctor from "./components/admin.dashboard.component/doctors.component/list-doctors.component";
import AddDoctor from "./components/admin.dashboard.component/doctors.component/add-doctors.component";

// import Header from "./components/admin.dashboard.component/Header";
// import Menu from "./components/admin.dashboard.component/Menu";
// import Footer from "./components/admin.dashboard.component/Footer";

// import Groupchat from "./components/chat/Groupchat.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    // const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div className="wrapper">
        <div>
          <Switch>
            {/* <Route exact path={["/home"]} component={Home} /> */}
            <Route exact path={["/", "/login"]} component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route exact path="/categories" component={ListCategory} />
            <Route exact path="/categories/add" component={AddCategory} />
            <Route path="/categories/:id" component={UpdateCategory} />
            <Route exact path="/products" component={ListProduct} />
            <Route exact path="/products/add" component={AddProduct} />
            <Route path="/products/:id" component={UpdateProduct} />
            <Route
              exact
              path="/productgalleries/"
              component={ListProductGallery}
            />
            <Route
              exact
              path="/productgalleries/add"
              component={AddProductGallery}
            />
            <Route exact path="/users" component={ListUser} />
            <Route exact path="/users/:id" component={UpdateUser} />

            <Route exact path="/doctors" component={ListDoctor} />
            <Route exact path="/doctors/add" component={AddDoctor} />

            <Redirect exact from="/" to="/login" />
            <Route path="/login" component={Login} />
            {/* <Route path="/chat" component={Groupchat} /> */}
          </Switch>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
