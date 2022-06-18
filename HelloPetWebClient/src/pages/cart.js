import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import Carts from "../services/cart.service";

import axios from "axios";
import authHeader from "../services/auth-header";

export class Cart extends Component {
  constructor(props) {
    super(props);

    this.getCarts = this.getCarts.bind(this);
    this.deleteCarts = this.deleteCarts.bind(this);
    this.getUser = this.getUser.bind(this);
    // this.tambahQty = this.tambahQty.bind(this)

    // this.onChangeId = this.onChangeId.bind(this);
    // this.onChangeUsers = this.onChangeUsers.bind(this);
    // this.onChangeProducts = this.onChangeProducts.bind(this);
    // this.onChangeQty = this.onChangeQty.bind(this);

    this.state = {
      user: undefined,
      currentUser: [],
      currentCart: [],
      message: [],
      sumCart: 0,

      insurancePrice: 0,
      shippingPrice: 0,
      transactionStatus: "PENDING",
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
    this.getCarts(user.id);
    this.sumCart();
  }

  addTransaction = () => {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        user: user.id,
      });
    }
    const form_data = new FormData();
    form_data.append("insurancePrice", this.state.insurancePrice);
    form_data.append("shippingPrice", this.state.shippingPrice);
    form_data.append("totalPrice", this.state.sumCart);
    form_data.append("transactionStatus", this.state.transactionStatus);
    form_data.append("users", this.state.user);
    const END_POINT = "transactions/";
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
      .then(
        (response) => {
          this.deleteCartByIdUser(user.id);
          window.location.reload();
          console.log(response.data);
        },
        (error) => {
          console.log(error);
          alert("sorry, something's wrong..");
        }
      );
  };

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

  sumCart() {
    const user = AuthService.getCurrentUser();
    axios
      .get("http://localhost:8080/carts/sumCart", {
        params: {
          userId: user.id,
        },
      })
      .then((response) => {
        this.setState({
          sumCart: response.data,
        });
      });
  }

  getCarts(userId) {
    Carts.getAll(userId)
      .then((response) => {
        this.setState({
          currentCart: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  //     onChangeId(e) {
  //     const id = e.target.value;

  //     this.setState((prevState) => ({
  //       currentCart: {
  //         ...prevState.currentCart,
  //         id: id,
  //       },
  //     }));
  //   }
  //   onChangeUsers(e) {
  //     const users = e.target.value;

  //     this.setState((prevState) => ({
  //       currentCart: {
  //         ...prevState.currentCart,
  //         users: users,
  //       },
  //     }));
  //   }
  //   onChangeProducts(e) {
  //     const products = e.target.value;

  //     this.setState((prevState) => ({
  //       currentCart: {
  //         ...prevState.currentCart,
  //         products: products,
  //       },
  //     }));
  //   }
  //   onChangeQty(e) {
  //     const qty = e.target.value;

  //     this.setState((prevState) => ({
  //       currentCart: {
  //         ...prevState.currentCart,
  //         qty: qty,
  //       },
  //     }));
  //   }

  //   tambahQty(userId) {
  //     Carts.put(
  //       this.state.currentCart.id,
  //       userId,
  //       this.state.currentCart
  //     )
  //       .then((response) => {
  //         alert("Updated Category Successfully!");
  //         console.log(response.data);
  //       })
  //       .catch((e) => {
  //           alert("Error")
  //         console.log(e);
  //       });
  //   }

  //     tambahQty = () => {
  //     const form_data = new FormData();
  //     form_data.append("id", JSON.stringify(this.state.currentCart));
  //     form_data.append("users", this.state.currentUser);
  //     form_data.append("products", this.state.currentCart.products);
  //     form_data.append("qty", this.state.currentCart.qty);

  //     const END_POINT = "carts/u/" + this.state.currentUser;
  //     axios
  //       .put(
  //         "http://localhost:8080/" + END_POINT,
  //         form_data,
  //         { headers: authHeader() },
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       )
  //       .then(
  //         (response) => {
  //           alert("Updated Product Successfully!");
  //           console.log(response.data);
  //         },
  //         (error) => {
  //           console.log(error);
  //           alert("Failed..!");
  //         }
  //       );
  //   };

  deleteCartByIdUser(userId) {
    Carts.deleteByIdUser(userId)
      .then((response) => {
        let updateCarts = this.state.currentCart.filter(
          (i) => i.userId !== userId
        );
        this.setState({ currentCart: updateCarts });
        console.log(response.data);
      })
      .catch((e) => {
        alert("sorry, something's wrong..");
        console.log(e);
      });
  }

  deleteCarts(id) {
    Carts.delete(id)
      .then((response) => {
        alert("Deleted Carts Successfully!");
        let updateCarts = this.state.currentCart.filter((i) => i.id !== id);
        this.setState({ currentCart: updateCarts });
        console.log(response.data);
        window.location.reload();
      })
      .catch((e) => {
        alert("sorry, something's wrong..");
        console.log(e);
      });
  }

  render() {
    const { currentCart, currentUser } = this.state;

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
                      Cart
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
              <div class="col-12 table-responsive">
                <table
                  class="table table-borderless table-cart"
                  aria-describedby="Cart"
                >
                  <thead>
                    <tr>
                      <th scope="col" class="text-center">
                        Image
                      </th>
                      <th scope="col" class="text-center">
                        Product Name
                      </th>
                      <th scope="col" class="text-center">
                        Price
                      </th>
                      {/* <th colspan="3" class="text-center" scope="col">Quantity</th> */}
                      <th scope="col" class="text-center">
                        Menu
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCart.map((currentCarts, index) => (
                      <tr data-index={index}>
                        <td style={{ width: "25%" }} class="text-center">
                          <img
                            src={
                              "http://localhost:8080/products/photo/" +
                              currentCarts.products.productImage
                            }
                            alt=""
                            class="cart-image"
                          />
                        </td>
                        <td style={{ width: "35%" }} class="text-center">
                          <div class="product-title">
                            {currentCarts.products.productName}
                          </div>
                          {/* <div class="product-subtitle">{currentCarts.products.categories.categoryName}</div> */}
                        </td>
                        <td style={{ width: "35%" }} class="text-center">
                          <div class="product-title">
                            {currentCarts.products.price}
                          </div>
                          <div class="product-subtitle">IDR</div>
                        </td>

                        {/* <td style={{ width: '20%' }} class="text-center">
                                                <button  class="btn btn-light">
                                                    <img src="/assets/images/minus.png" alt="" style={{ width: '25px', height: '25px' }}></img>
                                                </button>
                                            </td>
                                            <td style={{ width: '20%' }} class="text-center">
                                            <input type="number"  value={currentCarts.id} onChange={this.onChangeId}></input>
                                            <input type="number"  value={currentCarts.users.id} onChange={this.onChangeUsers}></input>
                                            <input type="number"  value={currentCarts.products.id} onChange={this.onChangeProducts}></input>
                                            <input type="number"  value={currentCarts.qty} onChange={this.onChangeQty}></input>
                                                {currentCarts.qty} 
                                            </td>
                                            <td style={{ width: '20%' }} class="text-center">
                                                <button type="submit" onClick={this.tambahQty} 
                                                class="btn btn-light">
                                                    <img src="/assets/images/plus.png" alt="" style={{ width: '25px', height: '25px' }}></img>
                                                </button>
                                            </td> */}
                        <td style={{ width: "20%" }} class="text-center">
                          <button
                            onClick={() => this.deleteCarts(currentCarts.id)}
                            class="btn btn-remove-cart"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div class="row" data-aos="fade-up" data-aos-delay="150">
              <div class="col-12">
                <hr />
              </div>
              <div class="col-12">
                <h2 class="mb-4">Shipping Details</h2>
              </div>
              <div style={{ backgroundColor: "red" }} class="col-4">
                <p>please complete your account settings first</p>
              </div>
            </div>
            <form>
              <div class="row mb-2" data-aos="fade-up" data-aos-delay="200">
                <div class="col-md-6">
                  <div class="form-group">
                    {/* <label for="name">Your Name</label> */}
                    <input
                      disabled
                      type="text"
                      className="form-control"
                      id="name"
                      value={currentUser.name}
                      hidden
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    {/* <label for="email">Your Email</label> */}
                    <input
                      disabled
                      type="email"
                      type="text"
                      className="form-control"
                      id="email"
                      value={currentUser.email}
                      hidden
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    {/* <label for="username">Username</label> */}
                    <input
                      disabled
                      type="username"
                      type="text"
                      className="form-control"
                      id="username"
                      value={currentUser.username}
                      hidden
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div className="form-group">
                    {/* <label for="gender">Gender</label> */}
                    <select
                      disabled
                      id="gender"
                      className="form-control"
                      onChange={this.onChangeGender}
                      hidden
                    >
                      <option>{currentUser.gender}</option>

                      {/* {listGender.map((gender) => (
                      <option value={gender}>{gender}</option>
                    ))} */}
                    </select>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="address">Address</label>
                    <textarea
                      disabled
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
                      disabled
                      id="provinces"
                      className="form-control"
                      onChange={this.onChangeProvince}
                    >
                      <option>{currentUser.provinces}</option>

                      {/* {provinces.map((provinces) => (
                      <option value={provinces.name}>{provinces.name}</option>
                    ))} */}
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="regencies_id">City</label>
                    <select
                      disabled
                      id="regencies"
                      className="form-control"
                      onChange={this.onChangeRegency}
                    >
                      <option>{currentUser.regencies}</option>

                      {/* {regencies.map((regencies) => (
                      <option value={regencies.name}>{regencies.name}</option>
                    ))} */}
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="zip_code">Postal Code</label>
                    <input
                      disabled
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
                      disabled
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
                      disabled
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
              </div>
              <div class="row" data-aos="fade-up" data-aos-delay="150">
                <div class="col-12">
                  <hr />
                </div>
                <div class="col-12">
                  <h2>Payment Informations</h2>
                </div>
              </div>
              <div class="row" data-aos="fade-up" data-aos-delay="200">
                <div class="col-4 col-md-2">
                  <div class="product-title">Rp. 0</div>
                  <div class="product-subtitle">Country Tax</div>
                </div>
                <div class="col-4 col-md-3">
                  <div class="product-title">Rp. 0</div>
                  <div class="product-subtitle">Product Insurance</div>
                </div>
                <div class="col-4 col-md-2">
                  <div class="product-title">Rp. 0</div>
                  <div class="product-subtitle">Ship to Jakarta</div>
                </div>
                <div class="col-4 col-md-2">
                  <div class="product-title text-success">
                    Rp. {this.state.sumCart}
                  </div>
                  <div class="product-subtitle">Total</div>
                </div>
                <div class="col-8 col-md-3">
                  <Link
                    to={"/transactions/" + currentUser.id}
                    onClick={this.addTransaction}
                    class="btn btn-success mt-4 px-4 btn-block"
                  >
                    Checkout Now
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

export default Cart;
