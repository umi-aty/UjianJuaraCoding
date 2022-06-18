import React, { Component } from "react";
import axios from "axios";
import authHeader from "../../../services/auth-header";
import UserService from "../../../services/user.service";
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
import { Link } from "react-router-dom";
export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeNoStr = this.onChangeNoStr.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.saveDoctor = this.saveDoctor.bind(this);

    this.state = {
      id: null,
      noStr: "",
      user: {},
      listUser: [],
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    UserService.getAll()
      .then((response) => {
        this.setState({
          listUser: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onChangeNoStr(e) {
    this.setState({
      noStr: e.target.value,
    });
  }

  onChangeUser(e) {
    this.setState({
      user: e.target.value,
    });
  }

  saveDoctor() {
    const form_data = new FormData();
    form_data.append("noStr", this.state.noStr);
    form_data.append("user", this.state.user);
    const END_POINT = "doctors/";
    axios
      .post(
        "http://localhost:8080/" + END_POINT,
        form_data,
        { headers: authHeader() },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        window.location.reload();
        console.log(response.data);
      })
      .catch((error) => {
        alert("sorry, something's wrong..");
        console.log(error);
      });
  }

  render() {
    const { listUser } = this.state;
    return (
      <div className="wrapper">
        <Header />
        <Menu />
        <section className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="submit-form">
                  <div>
                    <h4>Add User</h4>
                    <form>
                      <div className="form-group">
                        <label htmlFor="noStr">No Str</label>
                        <input
                          type="text"
                          className="form-control"
                          id="noStr"
                          required
                          value={this.state.noStr}
                          onChange={this.onChangeNoStr}
                          name="noStr"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="user">User</label>
                        <select
                          id="user"
                          className="form-control"
                          onChange={this.onChangeUser}
                        >
                          <option>Choose User...</option>
                          {listUser.map((user) => (
                            <option value={JSON.stringify(user.id)}>
                              {user.id} - {user.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <Link
                        to={"/doctors"}
                        onClick={this.saveDoctor}
                        className="btn btn-success"
                      >
                        Submit
                      </Link>
                    </form>
                  </div>
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
