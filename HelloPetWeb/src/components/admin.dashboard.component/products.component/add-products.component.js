import React, { Component } from "react";
import axios from "axios";
import authHeader from "../../../services/auth-header";
import CategoryService from "../../../services/category.service";
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
import { Link } from "react-router-dom";
export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeProductName = this.onChangeProductName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeStok = this.onChangeStok.bind(this);
    this.onChangeProductImage = this.onChangeProductImage.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.saveProduct = this.saveProduct.bind(this);

    this.state = {
      id: null,
      productName: "",
      price: 0,
      stok: 0,
      productImage: "",
      description: "",
      categories: {},
      listCategory: [],
    };
  }

  componentDidMount() {
    this.getCategory();
  }

  getCategory() {
    CategoryService.getAll()
      .then((response) => {
        this.setState({
          listCategory: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onChangeProductName(e) {
    this.setState({
      productName: e.target.value,
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }

  onChangeStok(e) {
    this.setState({
      stok: e.target.value,
    });
  }

  onChangeProductImage(e) {
    this.setState({
      productImage: e.target.files[0],
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeCategory(e) {
    this.setState({
      categories: e.target.value,
    });
  }

  saveProduct() {
    const form_data = new FormData();
    form_data.append("productName", this.state.productName);
    form_data.append("price", this.state.price);
    form_data.append("stok", this.state.stok);
    form_data.append("file", this.state.productImage);
    form_data.append("description", this.state.description);
    form_data.append("categories", this.state.categories);
    const END_POINT = "products/";
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
    const { listCategory } = this.state;
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
                    <h4>Add Product</h4>
                    <form>
                      <div className="form-group">
                        <label htmlFor="productName">Product Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="productName"
                          required
                          value={this.state.productName}
                          onChange={this.onChangeProductName}
                          name="productName"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                          type="number"
                          className="form-control"
                          id="price"
                          required
                          value={this.state.price}
                          onChange={this.onChangePrice}
                          name="price"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="stok">Stok</label>
                        <input
                          type="number"
                          className="form-control"
                          id="stok"
                          required
                          value={this.state.stok}
                          onChange={this.onChangeStok}
                          name="stok"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="productImage">Product Image</label>
                        <input
                          type="file"
                          className="form-control"
                          id="productImage"
                          required
                          onChange={this.onChangeProductImage}
                          name="productImage"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                          type="text"
                          className="form-control"
                          id="description"
                          required
                          value={this.state.description}
                          onChange={this.onChangeDescription}
                          name="description"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="categories">Category</label>
                        <select
                          id="categories"
                          className="form-control"
                          onChange={this.onChangeCategory}
                        >
                          <option>Choose Category...</option>
                          {listCategory.map((categories) => (
                            <option value={JSON.stringify(categories.id)}>
                              {categories.categoryName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <Link
                        to={"/products"}
                        onClick={this.saveProduct}
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
