import React, { Component } from "react";
import SearchComp from "./components/search";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={props => <Home />} />
          <Route
            path="/search"
            render={props => <SearchComp search={this.searchTasks} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;