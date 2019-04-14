import React, { Component } from "react";
import HeadRoom from "react-headroom";
import AppBar from "./AppBar";

class HeaderAppBar extends Component {
  render() {
    return (
      <div className="App">
        {/* <HeadRoom> </HeadRoom>*/}
          <AppBar />
        
      </div>
    );
  }
}

export default HeaderAppBar;
