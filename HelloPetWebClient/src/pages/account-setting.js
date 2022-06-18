import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import axios from "axios";
import authHeader from "../services/auth-header";

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeProvince = this.onChangeProvince.bind(this);
    this.onChangeRegency = this.onChangeRegency.bind(this);
    this.onChangeZipCode = this.onChangeZipCode.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);

    this.state = {
      currentUser: [],
      message: "",
      listGender: ["Male", "Female"],
      provinces: [],
      regencies: [],
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
    this.getUser(user.id);
    this.getProvince();
    this.getRegency();
  }

  getProvince() {
    axios
      .get("http://localhost:8080/provinces/", { headers: authHeader() })
      .then((response) => {
        this.setState({
          provinces: response.data,
        });
      });
  }

  getRegency() {
    axios
      .get("http://localhost:8080/regencies/", { headers: authHeader() })
      .then((response) => {
        this.setState({
          regencies: response.data,
        });
      });
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          name: name,
        },
      };
    });
  }

  onChangePassword(e) {
    const password = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        password: password,
      },
    }));
  }

  onChangePhone(e) {
    const phoneNumber = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        phoneNumber: phoneNumber,
      },
    }));
  }

  onChangeGender(e) {
    const gender = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        gender: gender,
      },
    }));
  }

  onChangeAddress(e) {
    const address = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        address: address,
      },
    }));
  }

  onChangeProvince(e) {
    const provinces = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        provinces: provinces,
      },
    }));
  }

  onChangeRegency(e) {
    const regencies = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        regencies: regencies,
      },
    }));
  }

  onChangeZipCode(e) {
    const zipCode = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        zipCode: zipCode,
      },
    }));
  }

  onChangeCountry(e) {
    const country = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        country: country,
      },
    }));
  }

  getUser(id) {
    UserService.get(id)
      .then((response) => {
        this.setState({
          currentUser: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateUser() {
    UserService.update(this.state.currentUser.id, this.state.currentUser)
      .then((response) => {
        alert("Updated User Successfully!");
        window.location.reload();
        console.log(response.data);
      })
      .catch((e) => {
        alert("sorry, something's wrong..");
        console.log(e);
      });
  }

  render() {
    const { currentUser, listGender, provinces, regencies } = this.state;
    return (
      <div class="container">
        <div class="page-content page-cart">
          <div
            class="section-content section-dashboard-home"
            data-aos="fade-up"
          >
            <div class="container-fluid">
              <div class="dashboard-content">
                <div class="row">
                  <div class="col-12">
                    <form>
                      <div class="row" id="locations">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="name">Your Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              value={currentUser.name}
                              onChange={this.onChangeName}
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="email">Your Email</label>
                            <input
                              disabled
                              type="email"
                              type="text"
                              className="form-control"
                              id="email"
                              value={currentUser.email}
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="username">Username</label>
                            <input
                              disabled
                              type="username"
                              type="text"
                              className="form-control"
                              id="username"
                              value={currentUser.username}
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div className="form-group">
                            <label for="gender">Gender</label>
                            <select
                              id="gender"
                              className="form-control"
                              onChange={this.onChangeGender}
                            >
                              <option>{currentUser.gender}</option>

                              {listGender.map((gender) => (
                                <option value={gender}>{gender}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="address">Address</label>
                            <input
                              type="text"
                              className="form-control"
                              id="address"
                              value={currentUser.address}
                              onChange={this.onChangeAddress}
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label for="provinces">Province</label>
                            <select
                              id="provinces"
                              className="form-control"
                              onChange={this.onChangeProvince}
                            >
                              <option>{currentUser.provinces}</option>

                              {provinces.map((provinces) => (
                                <option value={provinces.name}>
                                  {provinces.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label for="regencies_id">City</label>
                            <select
                              id="regencies"
                              className="form-control"
                              onChange={this.onChangeRegency}
                            >
                              <option>{currentUser.regencies}</option>

                              {regencies.map((regencies) => (
                                <option value={regencies.name}>
                                  {regencies.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label for="zip_code">Postal Code</label>
                            <input
                              type="text"
                              className="form-control"
                              id="zip_code"
                              value={currentUser.zipCode}
                              onChange={this.onChangeZipCode}
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="Country">Country</label>
                            <input
                              type="text"
                              className="form-control"
                              id="country"
                              value={currentUser.country}
                              onChange={this.onChangeCountry}
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="Mobile">Mobile</label>
                            <input
                              type="text"
                              className="form-control"
                              id="phoneNumber"
                              value={currentUser.phoneNumber}
                              onChange={this.onChangePhone}
                            />
                          </div>
                        </div>
                        <input
                          hidden
                          type="text"
                          className="form-control"
                          id="role"
                          value={["user"]}
                          // value={JSON.stringify(currentUser.role)}
                        />
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="password">Password</label>{" "}
                            <label style={{ color: "red" }}>
                              (please rewrite your password)
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              required
                              onChange={this.onChangePassword}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col text-right">
                          <button
                            class="btn btn-success px-5"
                            onClick={this.updateUser}
                          >
                            Save Now
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
