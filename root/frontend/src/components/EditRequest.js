import React, { Component } from "react";
import RequestItem from "./RequestItem";

class Request extends Component {
  render() {
    return this.props.requests.map(request => (
      <RequestItem key={request._id} request={request} />
    ));
  }
}

export default Request;
