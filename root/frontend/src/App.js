import React, { Component } from "react";
import Request from './components/Request'
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import RequestAsUser from './components/RequestAsUser'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={props => <Home />} />
         
          <Route
            path="/requests"
            render={props => <Request  />}
          />
           <Route
            path="/UserRequests"
            render={props => <RequestAsUser  />}
          />
         
        </div>
      </Router>
    );
  }
}

export default App;
