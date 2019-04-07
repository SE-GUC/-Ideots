import React, { Component } from "react";
import SearchComp from "./components/search";
import SearchByExpComp from "./components/searchByExp";
import Request from './components/Request'
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
            render={props => <SearchComp  />}
          /> 
          <Route
            path="/requests"
            render={props => <Request  />}
          />
          <Route
          path="/searchByExperience"
          render={props => <SearchByExpComp  />}
        />
        </div>
      </Router>
    );
  }
}

export default App;
