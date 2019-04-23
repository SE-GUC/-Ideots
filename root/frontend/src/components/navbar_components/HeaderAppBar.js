import React, { Component } from "react";
import AppBar from "./AppBar";

class HeaderAppBar extends Component {
  render() {
    return (
      <div className="App">
        <AppBar logOut={this.props.logOut} token={this.props.token} />
      </div>
    );
  }
}

export default HeaderAppBar;
