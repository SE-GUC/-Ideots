import React, { Component } from "react";
import Request from "./RequestCard";
import axios from "axios";

export class RequestList extends Component {
  state = {
    requests: []
  };
  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = () => {
    axios.get("https://lirten-hub-guc.herokuapp.com/api/requests").then(res => {
      this.setState({ requests: res.data.data });
    });
  };

  render() {
    return (
      <div>
        {this.state.requests.map(request => (
          <Request key={request._id} request={request} />
        ))}
        <h3
          style={{
            width: "100%",
            height: "50px",
            backgroundColor: "#ccc",
            lineHeight: "50px",
            textAlign: "center",
            fontSize: "20px",
            marginBottom: "5px"
          }}
        >
          No More Request
        </h3>
      </div>
    );
  }
}

export default RequestList;
