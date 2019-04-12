import React, { Component } from "react";
import "./App.css";
import SignIn from "./Components/login_Components/SignIn";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Welcome from "./Components/login_Components/Welcome";
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
    const res = await axios.post("http://localhost:5000/api/auth/login", body);
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
    }
    return (
      <Router>
        <Route path="/login" />
        <div>
          <SignIn
            signInMethod={this.logIn}
            mail={this.emailHandler}
            pass={this.passwordHandler}
          />
        </div>
      </Router>
    );
  }
}

export default App;
