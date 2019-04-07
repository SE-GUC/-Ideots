import React, { Component } from "react";
import axios from "axios";
import Tasks from "./Tasks";
import { Link } from "react-router-dom";

export class SearchComp extends Component {
  state = {
    searchText: "",
    tasks: []
  };

  searchTasks = async keyword => {
    console.log(keyword);
    const res = await axios.get(
      "http://localhost:3000/api/tasks/search/category=" + keyword
    );
    this.setState({ tasks: res.data.data });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  searchClicked = e => {
    e.preventDefault();
    this.searchTasks(this.state.searchText);
    this.setState({ searchText: "" });
  };
  render() {
    return (
      <div>
        <Link to="/" style={{ margin: "10px", textAlign: "center" }}>
          Home
        </Link>
        <form onSubmit={this.searchClicked} style={{ display: "flex" }}>
          <input
            type="text"
            name="searchText"
            placeholder="search tasks"
            style={{ flex: "5", margin: "20px" }}
            value={this.state.searchText}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="search"
            className="btn"
            style={{ flex: "1", margin: "20px" }}
          />
        </form>
        <Tasks tasks={this.state.tasks} />
      </div>
    );
  }
}

export default SearchComp;
