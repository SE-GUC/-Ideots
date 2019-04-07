import React, { Component } from "react";
const axios = require("axios");

export class RequestItem extends Component {
  //style function
  getStyle = () => {
    return {
      backgroundColor: "#f3f3f3"
    };
  };

  state = {
    RequestId: this.props.request._id,
    description: this.props.request.description
  };

  updatedescription = async description => {
    const config = {
      description: description,
      accepted: 0
    };
    const res = await axios.put(
      "http://localhost:3000/api/requests/" + this.state.RequestId,
      config
    );
  };

  onChange = e => this.setState({ description: e.target.value });

  update = e => {
    e.preventDefault();
    this.updatedescription(this.state.description);
  };

  render() {
    return (
      <div style={this.getStyle()}>
        <form onSubmit={this.update} style={{ display: "flex" }}>
          <input
            type="text"
            name="description"
            placeholder="Description"
            style={{ flex: "5", margin: "20px" }}
            value={this.state.description}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="update"
            className="btn"
            style={{ flex: "1", margin: "20px" }}
          />
        </form>
      </div>
    );
  }
}

export default RequestItem;
