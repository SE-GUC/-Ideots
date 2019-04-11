import React, { Component } from "react";
import Events from "./components/event_components/EventList";
import Home from "./components/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={props => <Home />} />
          <Route path="/eventList" render={props => <Events />} />
        </div>
      </Router>
    );
  }
}

export default App;
