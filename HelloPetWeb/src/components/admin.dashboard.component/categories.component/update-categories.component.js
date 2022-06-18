import React, { Component } from "react";
import CategoryService from "../../../services/category.service";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Menu from "../Menu";
import axios from "axios";
import authHeader from "../../../services/auth-header";

export default class UpdateCategory extends Component {
  constructor(props) {
    super(props);
    this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCategoryImage = this.onChangeCategoryImage.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.updateCategory = this.updateCategory.bind(this);

    this.state = {
      currentCategory: [],
      message: "",
    };
  }

  componentDidMount() {
    this.getCategory(this.props.match.params.id);
  }

  onChangeCategoryName(e) {
    const categoryName = e.target.value;

    this.setState(function (prevState) {
      return {
        currentCategory: {
          ...prevState.currentCategory,
          categoryName: categoryName,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentCategory: {
        ...prevState.currentCategory,
        description: description,
      },
    }));
  }

  onChangeCategoryImage(e) {
    const categoryImage = e.target.files[0];

    this.setState(function (prevState) {
      return {
        currentCategory: {
          ...prevState.currentCategory,
          categoryImage: categoryImage,
        },
      };
    });
  }

  getCategory(id) {
    CategoryService.get(id)
      .then((response) => {
        this.setState({
          currentCategory: response.data,
        });
        console.log(response.data);
        console.log(response.data.id);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateCategory = () => {
    const form_data = new FormData();
    form_data.append("id", this.state.currentCategory.id);
    form_data.append("categoryName", this.state.currentCategory.categoryName);
    form_data.append("description", this.state.currentCategory.description);
    form_data.append("file", this.state.currentCategory.categoryImage);
    const END_POINT = "categories/" + this.state.currentCategory.id;
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
    const { currentCategory } = this.state;

    return (
      <div>
        <Header />
        <Menu />
        <section className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="edit-form">
                  <h4>Category</h4>
                  <form>
                    <div className="form-group">
                      <label htmlFor="categoryName">Category Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="categoryName"
                        value={currentCategory.categoryName}
                        onChange={this.onChangeCategoryName}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={currentCategory.description}
                        onChange={this.onChangeDescription}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="categoryImage">Category Image</label>
                      <input
                        type="file"
                        className="form-control"
                        id="categoryImage"
                        onChange={this.onChangeCategoryImage}
                      />
                    </div>
                  </form>

                  <button
                    type="submit"
                    className="btn btn-warning btn-sm mr-2"
                    onClick={this.updateCategory}
                  >
                    Update
                  </button>
                  <Link
                    to={"/categories"}
                    className="btn btn-primary btn-sm"
                    type="submit"
                  >
                    Back
                  </Link>
                  <p>{this.state.message}</p>
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
