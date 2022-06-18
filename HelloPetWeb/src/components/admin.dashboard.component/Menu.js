import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    AuthService.logout();
  }
  render() {
    const { currentUser } = this.state;
    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="/admin" className="brand-link">
          <img
            src="/assets/dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">AdminLTE 3</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="/assets/dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            {currentUser ? (
              <div className="info">
                <a href="/admin" className="d-block">
                  {currentUser.username}
                </a>
              </div>
            ) : (
              <div className="info">
                <a href="/login" className="d-block">
                  user
                </a>
              </div>
            )}
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
           with font-awesome or any other icon font library */}
              <li className="nav-item ">
                <a href="/users" className="nav-link active">
                  <i class="nav-icon fas fa-user"></i>
                  <p>User</p>
                </a>
              </li>
              <li className="nav-item ">
                <a href="/doctors" className="nav-link active">
                  <i class="nav-icon fas fa-user"></i>
                  <p>Doctor</p>
                </a>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link active">
                  <i class="nav-icon fas fa-images"></i>
                  <p>
                    Category
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/categories" className="nav-link active">
                      <i class="nav-icon fas fa-table"></i>
                      <p>List Category</p>
                    </Link>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/categories/add" className="nav-link active">
                      <i class="nav-icon fas fa-edit"></i>
                      <p>Add Category</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link active">
                  <i class="nav-icon fas fa-images"></i>
                  <p>
                    Product
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/products" className="nav-link active">
                      <i class="nav-icon fas fa-table"></i>
                      <p>List Product</p>
                    </Link>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/products/add" className="nav-link active">
                      <i class="nav-icon fas fa-edit"></i>
                      <p>Add Product</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link active">
                  <i className="nav-icon fas fa-images" />
                  <p>
                    Product Gallery
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/productgalleries" className="nav-link active">
                      <i className="nav-icon fas fa-table" />
                      <p>List Product Gallery</p>
                    </Link>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link
                      to="/productgalleries/add"
                      className="nav-link active"
                    >
                      <i className="nav-icon fas fa-edit" />
                      <p>Add Product Gallery</p>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    );
  }
}
