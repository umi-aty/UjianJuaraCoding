import React, { Component } from "react";
import ProductGalleryService from "../../../services/product-gallery.service";
import { Link } from "react-router-dom";
import authHeader from "../../../services/auth-header";
import Footer from "../Footer";
import Header from "../Header";
import Menu from "../Menu";
export default class ListProductGallery extends Component {
  constructor(props) {
    super(props);
    this.retrieveProductGallery = this.retrieveProductGallery.bind(this);
    this.deleteProductGallery = this.deleteProductGallery.bind(this);
    this.state = {
      productGalleries: [],
    };
  }

  componentDidMount() {
    this.retrieveProductGallery();
    // this.getProduct(this.props.match.params.id);
  }

  retrieveProductGallery() {
    ProductGalleryService.getAll()
      .then((response) => {
        this.setState({
          productGalleries: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteProductGallery(id) {
    ProductGalleryService.delete(id)
      .then((response) => {
        let updateProductGallery = this.state.productGalleries.filter(
          (i) => i.id !== id
        );
        this.setState({ productGalleries: updateProductGallery });
        console.log(response.data);
        this.props.history.push("/productgalleries");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { productGalleries } = this.state;

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
                        <h3 className="card-title ">List Product Gallery</h3>
                      </div>
                      <div className="col-sm-3">
                        <Link
                          to={"/productgalleries/add"}
                          className="btn btn-block btn-success btn-xs"
                        >
                          Add Product Gallery
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th style={{ width: "10px" }}>#</th>
                          <th>Image</th>
                          <th>Product</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productGalleries.map((productGalleries, index) => (
                          <tr data-index={index}>
                            <td>{productGalleries.id}</td>
                            <td>
                              <img
                                src={
                                  "http://localhost:8080/productGalleries/photo/" +
                                  productGalleries.image
                                }
                                alt={productGalleries.image}
                                style={{ width: "100%", height: "300px" }}
                              ></img>
                            </td>
                            <td>{productGalleries.products.productName}</td>
                            <td>
                              <button
                                className="btn btn-danger btn-xs mr-2"
                                onClick={() =>
                                  this.deleteProductGallery(productGalleries.id)
                                }
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
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
