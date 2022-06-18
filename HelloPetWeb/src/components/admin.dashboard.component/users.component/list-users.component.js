import React, { Component } from "react";
import UserService from "../../../services/user.service";
import { Link } from "react-router-dom";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
export default class ListCategory extends Component {
  constructor(props) {
    super(props);
    this.retrieveUser = this.retrieveUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.retrieveUser();
  }

  retrieveUser() {
    UserService.getAll()
      .then((response) => {
        this.setState({
          users: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteUser(id) {
    UserService.delete(id)
      .then((response) => {
        alert("Deleted User Successfully!");
        let updateUser = this.state.users.filter((i) => i.id !== id);
        this.setState({ users: updateUser });

        console.log(response.data);
        this.props.history.push("/users");
      })
      .catch((e) => {
        alert("sorry, something's wrong...");
        console.log(e);
      });
  }

  render() {
    const { users } = this.state;

    return (
      <div>
        <Header />
        <Menu />
        <section className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-sm-9">
                        <h3 className="card-title ">List User</h3>
                      </div>
                      <div className="col-sm-3">
                        {/* <Link
                          to={"/register"}
                          className="btn btn-block btn-success btn-xs"
                        >
                          Add User
                        </Link> */}
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th style={{ width: "10px" }}>#</th>
                          <th>Full Name</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Gender</th>
                          <th>Country</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.users ? (
                          <>
                            {users.map((users, index) => (
                              <tr data-index={index}>
                                <td>{users.id}</td>
                                <td>{users.name}</td>
                                <td>{users.username}</td>
                                <td>{users.email}</td>
                                <td>{users.gender}</td>
                                <td>{users.country}</td>
                                <td>
                                  <Link
                                    to={"/users/" + users.id}
                                    className="btn btn-block btn-warning btn-xs"
                                  >
                                    Edit
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <tr>
                            <td colspan="4" className="text-center">
                              Data Kosong
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
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
