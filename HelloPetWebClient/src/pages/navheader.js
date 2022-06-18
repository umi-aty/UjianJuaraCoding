import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthService from "../services/auth.service";

export class navheader extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
      countCart: "",
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

  componentDidUpdate() {
    this.countCart();
  }
  countCart() {
    const user = AuthService.getCurrentUser();
    axios
      .get("http://localhost:8080/carts/countCart", {
        params: {
          userId: user.id,
        },
      })
      .then((response) => {
        this.setState({
          countCart: response.data,
        });
      });
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, countCart } = this.state;
    return (
      <div>
        <nav
          class="navbar navbar-expand-lg navbar-light navbar-store fixed-top navbar-fixed-top"
          data-aos="fade-down"
        >
          <div class="container">
            <a class="navbar-brand" href="/">
              <img
                src="/assets/images/hellopetslogo.png"
                alt=""
                style={{ width: "50px", height: "50px" }}
              />
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarResponsive">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                  <Link class="nav-link" to="/">
                    Home
                  </Link>
                </li>

                {currentUser ? (
                  <>
                    <li className="nav-item dropdown">
                      <a
                        href="#"
                        class="nav-link"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                      >
                        Services
                      </a>
                      <div class="dropdown-menu">
                        <li className="nav-item">
                          <a href="/store" className="nav-link">
                            Pet Store
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="/analyze" className="nav-link">
                            Consultation
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href={"/chat/u/" + currentUser.id}
                            className="nav-link"
                          >
                            Chat Doctor
                          </a>
                        </li>
                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        href="#"
                        class="nav-link"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                      >
                        <img
                          src="/assets/images/icon-user.png"
                          alt=""
                          class="rounded-circle mr-2 profile-picture"
                        />
                        Hi, {currentUser.username}
                      </a>
                      <div class="dropdown-menu">
                        <li className="nav-item">
                          <a
                            href={"/account-setting/" + currentUser.id}
                            className="nav-link"
                          >
                            Account Setting
                          </a>
                        </li>
                        <div class="dropdown-divider"> </div>
                        <li className="nav-item">
                          <a
                            href="/login"
                            className="nav-link"
                            onClick={this.logOut}
                          >
                            Logout
                          </a>
                        </li>
                      </div>
                    </li>
                    <li class="nav-item">
                      <a
                        href={"/carts/u/" + currentUser.id}
                        class="nav-link d-inline-block "
                      >
                        <img src="/assets/images/icon-cart-filled.svg" alt="" />
                        <div
                          style={{
                            display: "inline-block",
                            "min-width": "2em" /* em unit */,
                            padding: "0.3em" /* em unit */,
                            "border-radius": "50%",
                            "font-size": "10px",
                            "text-align": "center",
                            background: "#29a867",
                            color: "#fefefe",
                            "margin-left": "-10px",
                          }}
                        >
                          {countCart}
                        </div>
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link to={"/login"} className="nav-link">
                        Sign In
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to={"/register"} className="nav-link">
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default navheader;
