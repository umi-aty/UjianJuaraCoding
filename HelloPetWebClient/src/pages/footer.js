import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

export class footer extends Component {
  constructor(props) {
    super(props);

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
  Alert() {
    alert("Login first");
  }

  render() {
    const { currentUser } = this.state;
    return (
      <footer>
        <div
          className="container"
          style={{ border: "black", borderWidth: "2px" }}
        >
          <div className="row" style={{ border: "#0664A8" }}>
            <div className="col-6">
              <div style={{ marginTop: "5px" }}>
                <img
                  src={"/assets/images/hellopetslogo.png"}
                  alt=""
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
              <p className="pt-4 pb-2">
                Memberi pelayanan yang memuaskan untuk hewan kesayangan anda.
              </p>
            </div>
            <div className="col-3">
              <h3>Services</h3>

              {currentUser ? (
                <>
                  <p style={{ marginBottom: 0 }}>
                    <Link to="/store">Pet Store</Link>
                  </p>
                  <p style={{ marginBottom: 0 }}>
                    <Link to="/analyze">Live Diagnosis</Link>
                  </p>
                  <p style={{ marginBottom: 0 }}>
                    <Link to={"/chat/u/" + currentUser.id}>
                      Live Chat Doctor
                    </Link>
                  </p>
                </>
              ) : (
                <>
                  <p style={{ marginBottom: 0 }}>
                    <Link to="/store">Pet Store</Link>
                  </p>
                  <p style={{ marginBottom: 0 }}>
                    <Link onClick={this.Alert} to="/login">
                      Live Diagnosis
                    </Link>
                  </p>
                  <p style={{ marginBottom: 0 }}>
                    <Link onClick={this.Alert} to="/login">
                      Live Chat Doctor
                    </Link>
                  </p>
                </>
              )}
            </div>
            <div className="col-3">
              <h3>Company</h3>
              <p style={{ marginBottom: 0 }}>
                <Link to="/">Home</Link>
              </p>
              <p style={{ marginBottom: 0 }}>
                <Link to="/">About Us</Link>
              </p>
              <p style={{ marginBottom: 0 }}>
                <Link to="/">Services</Link>
              </p>
              <p style={{ marginBottom: 0 }}>
                <Link to="/">Contact Us</Link>
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col-12 text-center" style={{ border: "#0664A8" }}>
              <p className="pt-4 pb-2">2021 &copy; HelloPets - BekasiSquad</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
export default footer;
