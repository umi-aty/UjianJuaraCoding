import React, { Component } from "react";
import DoctorService from "../../../services/doctor.service";
import { Link } from "react-router-dom";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
export default class ListCategory extends Component {
  constructor(props) {
    super(props);
    this.retrieveDoctor = this.retrieveDoctor.bind(this);
    this.deleteDoctor = this.deleteDoctor.bind(this);
    this.state = {
      doctors: [],
    };
  }

  componentDidMount() {
    this.retrieveDoctor();
  }

  retrieveDoctor() {
    DoctorService.getAll()
      .then((response) => {
        this.setState({
          doctors: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteDoctor(id) {
    DoctorService.delete(id)
      .then((response) => {
        alert("Deleted Doctor Successfully!");
        let updateDoctor = this.state.doctors.filter((i) => i.id !== id);
        this.setState({ doctors: updateDoctor });

        console.log(response.data);
        this.props.history.push("/users");
      })
      .catch((e) => {
        alert("sorry, something's wrong...");
        console.log(e);
      });
  }

  render() {
    const { doctors } = this.state;

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
                        <h3 className="card-title ">List Doctor</h3>
                      </div>
                      <div className="col-sm-3">
                        <Link
                          to={"/doctors/add"}
                          className="btn btn-block btn-success btn-xs"
                        >
                          Add Doctor
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th style={{ width: "10px" }}>#</th>
                          <th>Full Name</th>
                          <th>No Str</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Gender</th>
                          <th>Country</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.doctors ? (
                          <>
                            {doctors.map((doctors, index) => (
                              <tr data-index={index}>
                                <td>{doctors.id}</td>
                                <td>{doctors.user.name}</td>
                                <td>{doctors.noStr}</td>
                                <td>{doctors.user.username}</td>
                                <td>{doctors.user.email}</td>
                                <td>{doctors.user.gender}</td>
                                <td>{doctors.user.country}</td>
                                <td>
                                  <button
                                    className="btn btn-block btn-danger btn-xs mb-2"
                                    onClick={() =>
                                      this.deleteDoctor(doctors.id)
                                    }
                                  >
                                    Delete
                                  </button>
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
