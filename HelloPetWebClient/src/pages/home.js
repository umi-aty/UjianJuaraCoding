import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import Products from "../services/products.service";
import Categories from "../services/category.service";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
export class Home extends Component {
  constructor(props) {
    super(props);
    this.retrieveDataProducts = this.retrieveDataProducts.bind(this);
    this.retrieveDataCategories = this.retrieveDataCategories.bind(this);

    this.image = "http://localhost:8080/products/photo/";

    this.state = {
      // currentUser: AuthService.getCurrentUser(),
      products: [],
      categories: [],
    };
  }

  retrieveDataCategories() {
    Categories.getAllCategories().then(
      (response) => {
        this.setState({
          categories: response.data,
        });
      },
      (error) => {
        this.setState({
          categories: error.response,
        });
      }
    );
  }

  retrieveDataProducts() {
    Products.getProducts().then(
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

  Alert() {
    alert("Login first");
  }

  componentDidMount() {
    this.retrieveDataCategories();
    this.retrieveDataProducts();
  }

  render() {
    const { products, categories } = this.state;
    const user = AuthService.getCurrentUser();

    return (
      <div className="page-content page-home">
        <section className="store-carousel">
          <div className="container">
            <div className="row">
              <div className="col-lg-12" data-aos="zoom-in">
                <div
                  id="storeCarousel"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <ol className="carousel-indicators">
                    <li
                      data-target="#storeCarousel"
                      data-slide-to="0"
                      className="active"
                    ></li>
                    <li data-target="#storeCarousel" data-slide-to="1"></li>
                    <li data-target="#storeCarousel" data-slide-to="2"></li>
                  </ol>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src="/assets/images/banner3.png"
                        className="d-block w-100"
                        alt="Carousel"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src="/assets/images/banner2.png"
                        className="d-block w-100"
                        alt="Carousel"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src="/assets/images/banner1.png"
                        className="d-block w-100"
                        alt="Carousel"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="store-services mt-5">
          <div className="container">
            <div className="row">
              <div className="col-12" data-aos="fade-up">
                <h5>Our Services</h5>
              </div>
            </div>
            {user ? (
              <>
                <Carousel
                  additionalTransfrom={0}
                  arrows
                  autoPlay
                  autoPlaySpeed={2000}
                  centerMode={false}
                  className=""
                  containerClass="container-with-dots"
                  dotListClass=""
                  draggable
                  focusOnSelect={false}
                  infinite
                  itemClass=""
                  keyBoardControl
                  minimumTouchDrag={80}
                  renderButtonGroupOutside={false}
                  renderDotsOutside={false}
                  responsive={{
                    desktop: {
                      breakpoint: {
                        max: 3000,
                        min: 1024,
                      },
                      items: 3,
                      partialVisibilityGutter: 40,
                    },
                    mobile: {
                      breakpoint: {
                        max: 464,
                        min: 0,
                      },
                      items: 1,
                      partialVisibilityGutter: 30,
                    },
                    tablet: {
                      breakpoint: {
                        max: 1024,
                        min: 464,
                      },
                      items: 2,
                      partialVisibilityGutter: 30,
                    },
                  }}
                  showDots={false}
                  sliderClass=""
                  slidesToSlide={1}
                  swipeable
                >
                  <Link
                    className="component-categories d-block mr-3"
                    to={"/chat/u/" + user.id}
                  >
                    <div className="categories-image">
                      <img
                        src="/assets/images/consultation.png"
                        alt="Carousel"
                        style={{
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                          width: "200px",
                          height: "200px",
                        }}
                      />
                    </div>
                    <p className="categories-text">Chat Doctor</p>
                  </Link>
                  <Link
                    className="component-categories d-block mr-3"
                    to="/analyze"
                  >
                    <div className="categories-image">
                      <img
                        src="/assets/images/scanning.png"
                        alt="Carousel"
                        style={{
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                          width: "200px",
                          height: "200px",
                        }}
                      />
                      <p className="categories-text">Pet Diagnosis</p>
                    </div>
                  </Link>
                  <Link
                    className="component-categories d-block mr-3"
                    to="/store"
                  >
                    <div className="categories-image">
                      <img
                        src="/assets/images/shop.png"
                        alt="Carousel"
                        style={{
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                          width: "200px",
                          height: "200px",
                        }}
                      />
                      <p className="categories-text">Pet Store</p>
                    </div>
                  </Link>
                </Carousel>
              </>
            ) : (
              <>
                <Carousel
                  additionalTransfrom={0}
                  arrows
                  autoPlay
                  autoPlaySpeed={2000}
                  centerMode={false}
                  className=""
                  containerClass="container-with-dots"
                  dotListClass=""
                  draggable
                  focusOnSelect={false}
                  infinite
                  itemClass=""
                  keyBoardControl
                  minimumTouchDrag={80}
                  renderButtonGroupOutside={false}
                  renderDotsOutside={false}
                  responsive={{
                    desktop: {
                      breakpoint: {
                        max: 3000,
                        min: 1024,
                      },
                      items: 3,
                      partialVisibilityGutter: 40,
                    },
                    mobile: {
                      breakpoint: {
                        max: 464,
                        min: 0,
                      },
                      items: 1,
                      partialVisibilityGutter: 30,
                    },
                    tablet: {
                      breakpoint: {
                        max: 1024,
                        min: 464,
                      },
                      items: 2,
                      partialVisibilityGutter: 30,
                    },
                  }}
                  showDots={false}
                  sliderClass=""
                  slidesToSlide={1}
                  swipeable
                >
                  <Link
                    className="component-categories d-block mr-3"
                    onClick={this.Alert}
                    to="/login"
                  >
                    <div className="categories-image">
                      <img
                        src="/assets/images/consultation.png"
                        alt="Carousel"
                        style={{
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                          width: "200px",
                          height: "200px",
                        }}
                      />
                    </div>
                    <p className="categories-text">Chat Doctor</p>
                  </Link>
                  <Link
                    className="component-categories d-block mr-3"
                    onClick={this.Alert}
                    to="/login"
                  >
                    <div className="categories-image">
                      <img
                        src="/assets/images/scanning.png"
                        alt="Carousel"
                        style={{
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                          width: "200px",
                          height: "200px",
                        }}
                      />
                      <p className="categories-text">Pet Diagnosis</p>
                    </div>
                  </Link>
                  <Link
                    className="component-categories d-block mr-3"
                    to="/store"
                  >
                    <div className="categories-image">
                      <img
                        src="/assets/images/shop.png"
                        alt="Carousel"
                        style={{
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                          width: "200px",
                          height: "200px",
                        }}
                      />
                      <p className="categories-text">Pet Store</p>
                    </div>
                  </Link>
                </Carousel>
              </>
            )}
          </div>
        </section>
        <section className="store-trend-categories">
          <div className="container">
            <div className="row">
              <div className="col-12" data-aos="fade-up">
                <h5>Trend Categories</h5>
              </div>
            </div>
            <div className="row">
              {categories &&
                categories.map((cat) => (
                  <div
                    className="col-6 col-md-3 col-lg-2"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <Link
                      className="component-categories d-block"
                      to={"/category/" + cat.id}
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
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </section>
        <section className="store-new-products">
          <div className="container">
            <div className="row">
              <div className="col-12" data-aos="fade-up">
                <h5>New Products</h5>
              </div>
            </div>
            <div className="row">
              {products &&
                products.map((product) => (
                  <div
                    className="col-6 col-md-4 col-lg-3"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <Link
                      className="component-products d-block"
                      to={"/detailproduct/" + product.id}
                    >
                      <div className="products-thumbnail">
                        <div
                          className="products-image"
                          style={{
                            backgroundImage: `url(${
                              this.image + product.productImage
                            })`,
                          }}
                        ></div>
                      </div>
                      <div className="products-text">{product.productName}</div>
                      <div className="products-price">{product.price}</div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
