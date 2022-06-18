import React, { Component } from "react";
import { Link } from "react-router-dom";
import Categories from "../services/category.service";
import Products from "../services/products.service";

export class Home extends Component {
  constructor(props) {
    super(props);
    // this.retrieveDataCategories = this.retrieveDataCategories.bind(this)
    this.image = "http://localhost:8080/products/photo/";

    this.state = {
      // currentUser: AuthService.getCurrentUser(),
      products: [],
      listCategory: [],
    };
  }

  componentDidMount() {
    this.retrieveDataProducts(this.props.match.params.id);
    this.getCategory();
  }

  getCategory() {
    Categories.getAllCategories()
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

  retrieveDataProducts(id) {
    Products.getAllProductByCategory(id).then(
      (response) => {
        this.setState({
          products: response.data,
        });
      },
      (error) => {
        this.setState({
          products: error.response,
        });
      }
    );
  }

  refresh() {
    window.location.reload();
  }

  render() {
    const { products, listCategory } = this.state;
    return (
      <div className="page-content page-home">
        <section className="store-trend-categories">
          <div className="container">
            <div className="row">
              <div className="col-12" data-aos="fade-up">
                <h5>All Categories</h5>
              </div>
            </div>
            <div className="row">
              {listCategory.map((cat) => (
                <div
                  className="col-6 col-md-3 col-lg-2"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <a
                    className="component-categories d-block"
                    href={"/category/" + cat.id}
                    onClick={this.refresh}
                  >
                    <div className="categories-image">
                      <img
                        src={
                          "http://localhost:8080/categories/photo/" +
                          cat.categoryImage
                        }
                        alt={cat.categoryImage}
                        className="w-100"
                      />
                    </div>
                    <p className="categories-text">{cat.categoryName}</p>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="store-new-products">
          <div className="container">
            <div className="row">
              <div className="col-12" data-aos="fade-up">
                <h5>All Products</h5>
              </div>
            </div>
            <div className="row">
              {this.state.products ? (
                <>
                  {products.map((products) => (
                    <div
                      className="col-6 col-md-4 col-lg-3"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      <Link
                        className="component-products d-block"
                        to={"/detailproduct/" + products.id}
                      >
                        <div className="products-thumbnail">
                          <div
                            className="products-image"
                            style={{
                              backgroundImage: `url(${
                                this.image + products.productImage
                              })`,
                            }}
                          ></div>
                        </div>
                        <div className="products-text">
                          {products.productName}
                        </div>
                        <div className="catProducts-price">
                          {products.price}
                        </div>
                      </Link>
                    </div>
                  ))}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
