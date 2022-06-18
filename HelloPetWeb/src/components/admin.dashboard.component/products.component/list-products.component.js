import React, { Component } from "react";
import ProductService from "../../../services/product.service";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Menu from "../Menu";
export default class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.retrieveProduct = this.retrieveProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.retrieveProduct();
  }

  retrieveProduct() {
    ProductService.getAll()
      .then((response) => {
        this.setState({
          products: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteProduct(id) {
    ProductService.delete(id)
      .then((response) => {
        alert("Deleted Product Successfully!");
        let updateProduct = this.state.products.filter((i) => i.id !== id);
        this.setState({ products: updateProduct });
        console.log(response.data);
        this.props.history.push("/products");
      })
      .catch((e) => {
        alert("Delete Failed! there's any galleries in this product");
        console.log(e);
      });
  }

  render() {
    const { products } = this.state;

    return (
      <div className="wrapper">
        <Header />
        <Menu />
        <section className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-sm-9">
                        <h3 className="card-title ">List Product</h3>
                      </div>
                      <div className="col-sm-3">
                        <Link
                          to={"/products/add"}
                          className="btn btn-block btn-success btn-xs"
                        >
                          Add Product
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th style={{ width: "10px" }}>#</th>
                          <th>Product Name</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Stok</th>
                          <th>Product Image</th>
                          <th>Description</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.products ? (
                          <>
                            {products.map((products, index) => (
                              <tr data-index={index}>
                                <td>{products.id}</td>
                                <td>{products.productName}</td>
                                <td>{products.categories.categoryName}</td>
                                <td>{products.price}</td>
                                <td>{products.stok}</td>
                                <td>
                                  <img
                                    src={
                                      "http://localhost:8080/products/photo/" +
                                      products.productImage
                                    }
                                    alt={products.productImage}
                                    style={{ width: "100%", height: "300px" }}
                                  ></img>
                                </td>
                                <td>{products.description}</td>
                                <td>
                                  <button
                                    className="btn btn-block btn-danger btn-xs mb-2"
                                    onClick={() =>
                                      this.deleteProduct(products.id)
                                    }
                                  >
                                    Delete
                                  </button>
                                  <Link
                                    to={"/products/" + products.id}
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
                            <td colspan="8" className="text-center">
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
