import React, { Component } from "react";
import Analyse from "../analyse/Analyse";
import "./Consultation.css";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
export class Consultation extends Component {
  constructor(props) {
    super(props);
    this.getDoctor = this.getDoctor.bind(this);

    this.state = {
      currentUser: undefined,
      currentDoctor: [],
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
    this.getDoctor();
  }

  getDoctor() {
    UserService.getDoctor()
      .then((response) => {
        this.setState({
          currentDoctor: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  render() {
    const { currentDoctor, currentUser } = this.state;
    return (
      <div className="page-content">
        <div className="row">
          <div className="col-4">
            <div style={{ height: "500px", overflowY: "scroll" }}>
              <div className="card p-3">
                <div className="d-flex align-items-center">
                  <div className="image">
                    <img
                      src={
                        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
                      }
                      className="rounded-circle"
                      style={{ width: "155px", borderRadius: "70px" }}
                    />
                  </div>
                  <div className="ml-3 w-100">
                    {currentDoctor.map((currentDoctor) => (
                      <>
                        <h4 className="mb-0 mt-0">{currentDoctor.user.name}</h4>
                        <span>STR : {currentDoctor.noStr}</span>
                        <div className="button mt-2 d-flex flex-row align-items-center">
                          <a
                            href={"/chat/u/" + currentUser.id}
                            className="btn btn-sm btn-outline-primary w-100"
                          >
                            Chat
                          </a>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="justify-content-center">
              <Analyse />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Consultation;
