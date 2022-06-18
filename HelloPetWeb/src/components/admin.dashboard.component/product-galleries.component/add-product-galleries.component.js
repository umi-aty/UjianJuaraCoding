import React, { Component } from "react";
import axios from "axios";
import authHeader from "../../../services/auth-header";
import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
import ProductService from "../../../services/product.service";
export default class AddProductGallery extends Component {
  constructor(props) {
    super(props);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeProduct = this.onChangeProduct.bind(this);
    this.saveGallery = this.saveGallery.bind(this);

    this.state = {
      id: null,
      image: "",
      products: {},
      listProduct: [],
    };
  }

  componentDidMount() {
    this.getProduct();
  }

  getProduct() {
    ProductService.getAll()
      .then((response) => {
        this.setState({
          listProduct: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onChangeImage(e) {
    this.setState({
      image: e.target.files[0],
    });
  }

  onChangeProduct(e) {
    this.setState({
      products: e.target.value,
    });
  }

  saveGallery = () => {
    const form_data = new FormData();
    form_data.append("file", this.state.image);
    form_data.append("products", JSON.parse(this.state.products));
    const END_POINT = "productGalleries/";
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
          alert("Add Gallery Successfully!");
          console.log(response.data);
        },
        (error) => {
          console.log(error);
          // alert("Failed..!");
        }
      );
  };

  render() {
    const { listProduct } = this.state;
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
                    <h4>Add Gallery</h4>
                    <form>
                      <div className="form-group">
                        <label htmlFor="image">Image</label>
                        <input
                          type="file"
                          className="form-control"
                          id="image"
                          required
                          onChange={this.onChangeImage}
                          name="image"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="categories">Product</label>
                        <select
                          id="categories"
                          className="form-control"
                          onChange={this.onChangeProduct}
                        >
                          <option selected>Choose...</option>
                          {listProduct.map((product) => (
                            <option value={JSON.stringify(product.id)}>
                              {product.productName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <Link
                        to={"/productgalleries"}
                        onClick={this.saveGallery}
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
