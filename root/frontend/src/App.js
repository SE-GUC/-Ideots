import React, { Component } from "react";
import EventRequest from './components/eventRequest'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={props => <Home />} />
         
          <Route
            path="/eventRequests"
            render={props => <EventRequest  />}
          />
         
        </div>
      </Router>
    );
  }
}

export default App;

