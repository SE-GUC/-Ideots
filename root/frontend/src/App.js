import React, { Component } from "react";
import "./App.css";
import SignIn from "./components/login_Components/SignIn";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Welcome from "./components/login_Components/Welcome";

import Request from "./components/userRequest_components/Request";
import RequestAsUser from "./components/userRequest_components/RequestAsUser";
import Tabs from "./components/tab_components/tabs";
import Home from "./components/Home";


import Notification from "./components/notification_components/Notifications";
import HeaderBar from "./components/navbar_components/HeaderAppBar";

const axios = require("axios");

class App extends Component {
  state = {
    email: "",
    password: "",
    loggedIn: false,
    token: ""
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
    const res = await axios.post("http://localhost:3000/api/auth/login", body);
    if (res.status === 200) {
      this.setState({
        loggedIn: true,
        currentUserId: res.data._id,
        token: res.data.token
      });
    } else {
      console.log("wrong email or password");
    }
  };

  render() {
    if (this.state.loggedIn) {
      return <Welcome token={this.state.token} />;
    }else{
    return (
      <Router>

        <HeaderBar />
        <Route path="/" render={props => <Tabs />} />
        <div className="App">
          <Route path="/" render={props => <Home />} />

          <Route path="/requests" render={props => <Request />} />
          <Route path="/UserRequests" render={props => <RequestAsUser />} />
        <Route path="/login" />
        <div>
          <SignIn
            signInMethod={this.logIn}
            mail={this.emailHandler}
            pass={this.passwordHandler}
          />
        </div>
        </div>
      </Router>
    );
  }}
}

export default App;
