import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import Carts from "../services/cart.service";

export class Transaction extends Component {
  constructor(props) {
    super(props);

    this.getTransaction = this.getTransaction.bind(this);
    this.getUser = this.getUser.bind(this);

    this.state = {
      user: undefined,
      currentUser: [],
      currentTransaction: [],
      message: [],
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        user: user.id,
      });
    }
    this.getUser(user.id);
    this.getTransaction(user.id);
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

  getTransaction(userId) {
    Carts.getTransaction(userId)
      .then((response) => {
        this.setState({
          currentTransaction: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentTransaction, currentUser } = this.state;

    return (
      <div class="page-content page-cart">
        <section
          class="store-breadcrumbs"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          <div class="container">
            <div class="row">
              <div class="col-12">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Transaction
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>
        <section class="store-cart">
          <div class="container">
            <div class="row" data-aos="fade-up" data-aos-delay="100">
              <div class="col-6 table-responsive">
                {currentTransaction.map((currentTransaction) => (
                  <div>
                    <div class="product-title">Total Price</div>
                  </div>
                ))}
              </div>
              <div class="col-6 table-responsive">
                {currentTransaction.map((currentTransaction) => (
                  <div>
                    <div class="product-title">
                      Rp. {currentTransaction.totalPrice}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div class="row" data-aos="fade-up" data-aos-delay="150">
              <div class="col-12">
                <hr />
              </div>
              <div class="col-12">
                {/* <h2 class="mb-4">Details</h2> */}
                <p>
                  Silahkan lanjutkan transaksi pembayaran via transfer ke
                  rekening:
                </p>
                <p>
                  BNI : 001-001-001-001-001 <br></br>
                  a/n : HelloPets
                </p>
              </div>
            </div>
            <form>
              <div
                class="row mb-2"
                data-aos="fade-up"
                data-aos-delay="200"
              ></div>
              <div class="row">
                <div class="col-8 col-md-3">
                  <Link to="/" class="btn btn-success mt-4 px-4 btn-block">
                    Shopping again
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

export default Transaction;
