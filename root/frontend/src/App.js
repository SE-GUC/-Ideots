import React, { Component } from "react";

import "./App.css";
import SignIn from "./components/login_Components/SignIn";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { Redirect } from "react-router-dom";
// import Welcome from "./components/login_Components/Welcome";

import Request from "./components/userRequest_components/Request";
import RequestAsUser from "./components/userRequest_components/RequestAsUser";

import Tabs from "./components/tab_components/tabs";
import Home from "./components/Home";
import EventRequest from "./components/eventRequest";
import NotificationList from "./components/notification_components/Notifications";
import HeaderBar from "./components/navbar_components/HeaderAppBar";

// import AppBar from './components/navbar_components/AppBar'

import EventList from "./components/event_components/EventList";
import Event from "./components/event_components/Event";

import PaperBase from "./components/Actions/Paperbase";
// import createMixins from "@material-ui/core/styles/createMixins";

const axios = require("axios");

class App extends Component {
  state = {
    clickedEvent: {}
  };
  setTheEvent = eventProps => {
    this.setState({
      clickedEvent: eventProps,
      email: "",
      password: "",
      loggedIn: false,
      token: ""
    });
  };

  emailHandler = email => {
    this.setState({ email });
  };

  passwordHandler = password => {
    this.setState({ password });
  };

  logIn = async () => {
    let body = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(body);
    let res;
    try {
      res = await axios.post("http://localhost:3000/api/auth/login", body);
      if (res.status === 200) {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("token", res.data.token);
        this.setState({
          loggedIn: true,
          token: res.data.token
        });
      }
    } catch {
      console.log("wrong email or password");
    }
  };
  componentWillMount() {
    this.setState({
      loggedIn: localStorage.getItem("loggedIn"),
      token: localStorage.getItem("token")
    });
  }

  logOut = () => {
    console.log(
      localStorage.getItem("loggedIn") + "  " + localStorage.getItem("token")
    );
    localStorage.setItem("loggedIn", false);
    localStorage.setItem("token", null);
    this.render();
  };

  render() {
    let logged = localStorage.getItem("loggedIn") === "true";

    if (!logged) {
      console.log("heyhey");
      return (
        <div>
          <SignIn
            signInMethod={this.logIn}
            mail={this.emailHandler}
            pass={this.passwordHandler}
          />
        </div>
      );
    }

    return (
      <div>
        <div
        
          className="Header"
        >
          <HeaderBar token={this.state.token} logOut={this.logOut} />
        </div>
        <Router>
          <div className="App" style={{ marginLeft: "15%", marginTop: "3%",paddingTop: "3%" }}>
            <Route
              exact
              path="/"
              style={{   }}
              render={props => <Home token={this.state.token} />}
            />
            <Route
              exact
              path="/requests"
              render={props => <Request token={this.state.token} />}
            />
            <Route
              exact
              path="/EventList"
              render={() => <EventList setTheEvent={this.setTheEvent} />}
            />
            <Route
              path="/eventRequests"
              render={props => <EventRequest token={this.state.token} />}
            />
            
            <Route
              exact
              path="/UserRequests"
              render={props => <RequestAsUser token={this.state.token} />}
            />
            <Route
              exact
              path="/Event"
              render={() => (
                <Event
                  key={this.state.clickedEvent._id}
                  event={this.state.clickedEvent}
                  token={this.state.token}
                />
              )}
            />
            <Route
              exact
              path="/tabs"
              render={props => <Tabs token={this.state.token} />}
            />  
            <Route
              exact
              path="/Notifications"
              render={props => <NotificationList token={this.state.token} />}
            />          
          </div>
        </Router>
        <div>
          <PaperBase token={this.state.token} />
        </div>
        
      </div>
    );
  }
}

export default App;
