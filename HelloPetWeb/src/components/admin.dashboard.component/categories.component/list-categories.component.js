import React, { Component } from "react";
import CategoryService from "../../../services/category.service";
import { Link } from "react-router-dom";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
export default class ListCategory extends Component {
  constructor(props) {
    super(props);
    this.retrieveCategory = this.retrieveCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.retrieveCategory();
  }

  retrieveCategory() {
    CategoryService.getAll()
      .then((response) => {
        this.setState({
          categories: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteCategory(id) {
    CategoryService.delete(id)
      .then((response) => {
        alert("Deleted Category Successfully!");
        let updateCategory = this.state.categories.filter((i) => i.id !== id);
        this.setState({ categories: updateCategory });

        console.log(response.data);
        this.props.history.push("/categories");
      })
      .catch((e) => {
        alert("Delete Failed! there's any products in this category");
        console.log(e);
      });
  }

  render() {
    const { categories } = this.state;

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
                        <h3 className="card-title ">List Category</h3>
                      </div>
                      <div className="col-sm-3">
                        <Link
                          to={"/categories/add"}
                          className="btn btn-block btn-success btn-xs"
                        >
                          Add Category
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th style={{ width: "10px" }}>#</th>
                          <th>Category Name</th>
                          <th>Description</th>
                          <th>Image</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.categories ? (
                          <>
                            {categories.map((categories, index) => (
                              <tr data-index={index}>
                                <td>{categories.id}</td>
                                <td>{categories.categoryName}</td>
                                <td>{categories.description}</td>
                                <td>
                                  <img
                                    src={
                                      "http://localhost:8080/categories/photo/" +
                                      categories.categoryImage
                                    }
                                    alt={categories.categoryImage}
                                    style={{ width: "100%", height: "300px" }}
                                  ></img>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-block btn-danger btn-xs mb-2"
                                    onClick={() =>
                                      this.deleteCategory(categories.id)
                                    }
                                  >
                                    Delete
                                  </button>
                                  <Link
                                    to={"/categories/" + categories.id}
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
                            <td colspan="4" className="text-center">
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
