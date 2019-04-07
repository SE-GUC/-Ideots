import React, { Component } from 'react'


export class members extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
}
callAPI() {
    fetch("http://localhost:3000/api/users/members")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
}
componentWillMount() {
    this.callAPI();
}
  render() {
    return (
      <div>
        {this.state.apiResponse}
      </div>
    )
  }
}

export default members
