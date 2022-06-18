import React, { Component } from "react";
import UserService from "../../../services/user.service";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Menu from "../Menu";
import axios from "axios";
import authHeader from "../../../services/auth-header";

export default class UpdateCategory extends Component {
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
    this.getUser(this.props.match.params.id);
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
        this.props.history.push("/users");
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentUser, listGender, provinces, regencies } = this.state;

    return (
      <div>
        <Header />
        <Menu />
        <section className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="edit-form">
                  <h4>User</h4>
                  <form>
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={currentUser.name}
                        onChange={this.onChangeName}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={currentUser.password}
                        onChange={this.onChangePassword}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phoneNumber">Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        value={currentUser.phoneNumber}
                        onChange={this.onChangePhone}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="gender">Gender</label>
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
                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        value={currentUser.address}
                        onChange={this.onChangeAddress}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="provinces">Province</label>
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
                    <div className="form-group">
                      <label htmlFor="regencies">City</label>
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
                    <div className="form-group">
                      <label htmlFor="zip_code">Postal Code</label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip_code"
                        value={currentUser.zipCode}
                        onChange={this.onChangeZipCode}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="country">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        id="country"
                        value={currentUser.country}
                        onChange={this.onChangeCountry}
                      />
                    </div>

                    <input
                      hidden
                      type="text"
                      className="form-control"
                      id="username"
                      value={currentUser.username}
                    />
                    <input
                      hidden
                      type="text"
                      className="form-control"
                      id="email"
                      value={currentUser.email}
                    />
                    <input
                      hidden
                      type="text"
                      className="form-control"
                      id="role"
                      value={["admin"]}
                      // value={JSON.stringify(currentUser.role)}
                    />
                  </form>

                  <button
                    type="submit"
                    className="btn btn-warning btn-sm mr-2"
                    onClick={this.updateUser}
                  >
                    Update
                  </button>
                  <Link
                    to={"/users"}
                    className="btn btn-primary btn-sm"
                    type="submit"
                  >
                    Back
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
