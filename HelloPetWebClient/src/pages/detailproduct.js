import React, { Component } from "react";
import { Link } from "react-router-dom";
import Product from "../services/products.service";
import AuthService from "../services/auth.service";

import axios from "axios";
import authHeader from "../services/auth-header";
export default class Detailproduct extends Component {
  constructor(props) {
    super(props);
    // this.getDataProducts = this.getDataProducts.bind(this)
    // this.getDataCategories = this.retrieveDataCategories.bind(this)
    // this.getGallery = this.getGallery.bind(this);
    this.addToCart = this.addToCart.bind(this);

    this.state = {
      currentUser: undefined,
      currentProduct: {
        id: null,
        productName: "",
        price: "",
        stok: "",
        productImage: "",
        description: "",
        categories: {},
        galleries: [],
      },
      listGalleries: [],
      message: "",
      qty: 0,
    };
  }

  componentDidMount() {
    this.getProduct(this.props.match.params.id);

    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user.id,
      });
    }
  }

  getProduct(id) {
    Product.get(id)
      .then((response) => {
        this.setState({
          currentProduct: response.data,
          // listGalleries: response.data.productGalleries,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  addToCart = () => {
    const form_data = new FormData();
    form_data.append("users", this.state.currentUser);
    form_data.append("products", this.state.currentProduct.id);
    form_data.append("qty", this.state.qty + 1);
    const END_POINT = "carts/";
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
          //   alert("Add Carts Successfully!");
          //   window.location.replace("/carts/");
          window.location.reload();
          console.log(response.data);
          //   this.setState({
          //         currentUser: response.data.users.id,
          //         currentProduct: { id: response.data.products.id },
          //         qty: response.data.qty,
          //     })
        },
        (error) => {
          console.log(error);
          alert("sorry, something's wrong..");
        }
      );
  };

  Alert() {
    alert("Login first");
  }

  render() {
    const { currentProduct, listGalleries, currentUser } = this.state;
    return (
      <div className="page-content page-details">
        <section
          className="store-breadcrumbs"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          <div className="container">
            <div className="row">
              <div className="col-12">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Product Details
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>
        <section className="store-gallery" id="gallery">
          <div className="container">
            <div className="row">
              <div className="col-lg-8" data-aos="zoom-in">
                <div name="slide-fade" mode="out-in">
                  <img
                    key="#"
                    src={
                      "http://localhost:8080/products/photo/" +
                      currentProduct.productImage
                    }
                    className="w-100 main-image"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-lg-2">
                <div className="row">
                  <div
                    className="col-3 col-lg-12 mt-2 mt-lg-0"
                    // v-for="(photo, index) in photos"
                    // key="#"
                    // data-aos="zoom-in"
                    // data-aos-delay="100"
                  >
                    {/* {listGalleries.map((gl) => { */}
                    <a
                      href={
                        "http://localhost:8080/products/photo/" +
                        currentProduct.productImage
                      }
                    >
                      <img
                        src={
                          "http://localhost:8080/products/photo/" +
                          currentProduct.productImage
                        }
                        className="w-100 thumbnail-image"
                        alt=""
                      />
                    </a>
                    {/* })} */}
                    {/* <a href="#">
                                            <img src="#"
                                                className="w-100 thumbnail-image"
                                                alt=""
                                            />
                                        </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="store-details-container" data-aos="fade-up">
          <section className="store-heading">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <h1>{currentProduct.productName}</h1>
                  <div className="owner">
                    {currentProduct.categories.categoryName}
                  </div>
                  <div className="owner">Stok : {currentProduct.stok}</div>
                  <div className="price">Price Rp. {currentProduct.price}</div>
                </div>
                <div className="col-lg-2" data-aos="zoom-in">
                  {currentUser ? (
                    <Link
                      className="btn btn-success nav-link px-4 text-white btn-block mb-3"
                      to={"/carts/u/" + currentUser}
                      onClick={this.addToCart}
                    >
                      Add to Cart
                    </Link>
                  ) : (
                    <Link
                      className="btn btn-success nav-link px-4 text-white btn-block mb-3"
                      to="/login"
                      onClick={this.Alert}
                    >
                      Add to Cart
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
          <section className="store-description">
            <div className="container">
              <div className="row">
                <div className="col-12 col-lg-8">
                  <p>{currentProduct.description}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

// export default Detailproduct
