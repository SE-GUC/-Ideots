
import React, { Component } from "react";
import Tabs from "./components/tab_components/tabs";
import Home from "./components/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";


import Notification from './components/notification_components/Notifications'


class App extends Component {
 



  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={props => <Home />} />
          <Route path="/tabs" render={props => <Tabs />} />
        </div>
      </Router>
    );
  }
}

export default App;
