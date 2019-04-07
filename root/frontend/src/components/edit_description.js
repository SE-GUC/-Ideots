import React, { Component } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

export class edit_description extends Component {
  state = {
    partnerId: "",
    request: []
  };

  getallRequests = async () => {
    const res = await axios.get("http://localhost:3000/api/requests");
    const notEdit = [];
    for (let i = 0; i < res.data.data.length; i++) {
      const x = res.data.data[i];
      if (x.partnerID === this.state.partnerId && x.accepted === -1) {
        notEdit.push(x);
      }
    }
    this.setState({ request: notEdit });
  };

  onChange = e => this.setState({ partnerId: e.target.value });

  getunaccepted = e => {
    e.preventDefault();
    this.getallRequests();
  };
  render() {
    return (
      <div>
        <Link to="/" style={{ margin: "10px", textAlign: "center" }}>
          Home
        </Link>

        <form onSubmit={this.getunaccepted} style={{ display: "flex" }}>
          <input
            type="text"
            name="partnerId"
            placeholder="Partner Id"
            style={{ flex: "5", margin: "20px" }}
            value={this.state.partnerId}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="get My Not Edit Request"
            className="btn"
            style={{ flex: "1", margin: "20px" }}
          />
        </form>
        <Request requests={this.state.request} />
      </div>
    );
  }
}

export default edit_description;
