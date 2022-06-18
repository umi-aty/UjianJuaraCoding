import React, { Component } from "react";
import ProductService from "../../../services/product.service";
import CategoryService from "../../../services/category.service";
import axios from "axios";
import authHeader from "../../../services/auth-header";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Menu from "../Menu";

export default class UpdateProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeProductName = this.onChangeProductName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeStok = this.onChangeStok.bind(this);
    this.onChangeProductImage = this.onChangeProductImage.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.updateProduct = this.updateProduct.bind(this);

    this.state = {
      currentProduct: {
        id: null,
        productName: "",
        price: "",
        stok: "",
        productImage: "",
        description: "",
        categories: {},
      },
      listCategory: [],
      message: "",
    };
  }

  componentDidMount() {
    this.getProduct(this.props.match.params.id);
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
    const productName = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          productName: productName,
        },
      };
    });
  }

  onChangePrice(e) {
    const price = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          price: price,
        },
      };
    });
  }

  onChangeStok(e) {
    const stok = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          stok: stok,
        },
      };
    });
  }

  onChangeProductImage(e) {
    const productImage = e.target.files[0];

    this.setState(function (prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          productImage: productImage,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentProduct: {
        ...prevState.currentProduct,
        description: description,
      },
    }));
  }

  onChangeCategory(e) {
    const categories = e.target.value;

    this.setState((prevState) => ({
      currentProduct: {
        ...prevState.currentProduct,
        categories: categories,
      },
    }));
  }

  getProduct(id) {
    ProductService.get(id)
      .then((response) => {
        this.setState({
          currentProduct: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateProduct = () => {
    const form_data = new FormData();
    form_data.append("id", this.state.currentProduct.id);
    form_data.append("productName", this.state.currentProduct.productName);
    form_data.append("price", this.state.currentProduct.price);
    form_data.append("stok", this.state.currentProduct.stok);
    form_data.append("file", this.state.currentProduct.productImage);
    form_data.append("description", this.state.currentProduct.description);
    form_data.append("categories", this.state.currentProduct.categories);
    const END_POINT = "products/" + this.state.currentProduct.id;
    axios
      .put(
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
  };

  render() {
    const { currentProduct, listCategory } = this.state;
    return (
      <div className="wrapper">
        <Header />
        <Menu />
        <section className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="edit-form">
                  <h4>Edit Product</h4>
                  <form>
                    <div className="form-group">
                      <label htmlFor="productName">Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="productName"
                        value={currentProduct.productName}
                        onChange={this.onChangeProductName}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="price">Product Price</label>
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        value={currentProduct.price}
                        onChange={this.onChangePrice}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="stok">Stok</label>
                      <input
                        type="number"
                        className="form-control"
                        id="stok"
                        value={currentProduct.stok}
                        onChange={this.onChangeStok}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="productImage">Product Image</label>
                      <input
                        type="file"
                        className="form-control"
                        id="productImage"
                        // value={currentProduct.productImage}
                        onChange={this.onChangeProductImage}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={currentProduct.description}
                        onChange={this.onChangeDescription}
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
                        {/* <option>
                          {currentProduct.categories.categoryName}
                        </option> */}

                        {listCategory.map((cat) => (
                          <option key={cat.id} value={JSON.stringify(cat.id)}>
                            {cat.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <Link
                      to={"/products"}
                      className="btn btn-warning btn-sm mr-2"
                      onClick={this.updateProduct}
                    >
                      Update
                    </Link>
                    <Link
                      to={"/products/"}
                      className="btn btn-primary btn-sm"
                      type="submit"
                    >
                      Back
                    </Link>
                  </form>
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
