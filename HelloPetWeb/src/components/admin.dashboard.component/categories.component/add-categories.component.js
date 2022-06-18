import React, { Component } from "react";
import axios from "axios";
import authHeader from "../../../services/auth-header";
import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
export default class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCategoryImage = this.onChangeCategoryImage.bind(this);
    this.saveCategory = this.saveCategory.bind(this);
    // this.newCategory = this.newCategory.bind(this);

    this.state = {
      id: null,
      categoryName: "",
      description: "",
      categoryImage: "",
    };
  }

  onChangeCategoryName(e) {
    this.setState({
      categoryName: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeCategoryImage(e) {
    this.setState({
      categoryImage: e.target.files[0],
    });
  }

  saveCategory() {
    const form_data = new FormData();
    form_data.append("categoryName", this.state.categoryName);
    form_data.append("file", this.state.categoryImage);
    form_data.append("description", this.state.description);
    const END_POINT = "categories/";
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
    return (
      <div>
        <Header />
        <Menu />
        <section className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="submit-form">
                  <div>
                    <div className="form-group">
                      <label htmlFor="categoryName">Category Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="categoryName"
                        required
                        value={this.state.categoryName}
                        onChange={this.onChangeCategoryName}
                        name="categoryName"
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
                      <label htmlFor="categoryImage">Category Image</label>
                      <input
                        type="file"
                        className="form-control"
                        id="categoryImage"
                        required
                        onChange={this.onChangeCategoryImage}
                        name="categoryImage"
                      />
                    </div>

                    <button
                      onClick={this.saveCategory}
                      className="btn btn-block btn-success btn-sm"
                    >
                      Submit
                    </button>
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
