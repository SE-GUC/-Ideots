import React, { Component } from "react";
import AppBar from "./AppBar";

class HeaderAppBar extends Component {
  render() {
    return (
      <div className="App">
        <AppBar logOut={this.props.logOut} />
      </div>
    );
  }
}

export default HeaderAppBar;
