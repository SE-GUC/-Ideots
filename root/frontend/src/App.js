import React, { Component } from "react";

import "./App.css";
import SignIn from "./components/login_Components/SignIn";
import ButtonAppBar from "./components/login_Components/ButtonAppBar";
import FormPage from "./components/login_Components/FormPage";
import SignUp from "./components/login_Components/SignUp";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { Redirect } from "react-router-dom";
// import Welcome from "./components/login_Components/Welcome";

import Request from "./components/userRequest_components/Request";
import RequestAsUser from "./components/userRequest_components/RequestAsUser";

import Tabs from "./components/tab_components/tabs";
import Home from "./components/Home";
import EventRequest from "./components/eventRequest";
// import Notification from "./components/notification_components/Notifications";
import HeaderBar from "./components/navbar_components/HeaderAppBar";

// import AppBar from './components/navbar_components/AppBar'

import EventList from "./components/event_components/EventList";
import Event from "./components/event_components/Event";

import PaperBase from "./components/Actions/Paperbase";


import ShowMessage from "./components/login_Components/ShowMessage";

import Profile from "./components/profile/profile";

// import createMixins from "@material-ui/core/styles/createMixins";

const axios = require("axios");

class App extends Component {
  state = {
    clickedEvent: {},
    wantsToLogin: true
  };


  setTheEvent = eventProps => {
    this.setState({
      clickedEvent: eventProps

    });
  };

  emailHandler = email => {
    this.setState({ email });
  };

  passwordHandler = password => {
    this.setState({ password });
  };
  
  typeHandler = type => {
    this.setState({type})
  }

  logIn = async () => {
    let body = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(body);
    let res;
    try {
      res = await axios.post("https://lirten-hub-guc.herokuapp.com/api/auth/login", body);
      if (res.status === 200) {
      
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("token", res.data.token);
        this.setState({
          loggedIn: true,
          token: res.data.token
        });
      }
      else{this.setState({wrongEmailOrPass:true})
      console.log("mn gowa login")}
    } catch {
      console.log("wrong email or password");
      this.setState({wrongEmailOrPass:true})
    }
  };

  loginORsignup = async flag => {
    this.setState({ wantsToLogin: flag });
  };

  signUp = async (pass1,pass2,type) => {
    if (pass1!==pass2){
      this.setState({samePassFlag:true})
    }
    else {
    let body = {
      email: this.state.email,
      password: this.state.password,
      type:type
    };
    console.log(body);
    let res;
    try {
      res = await axios.post("https://lirten-hub-guc.herokuapp.com/api/auth/register", body);
      if (res.status === 200) {
        this.setState({isSuccessfulReg:true})
      }
    } catch {}
  }};

  componentWillMount() {
    this.setState({
      loggedIn: localStorage.getItem("loggedIn"),
      token: localStorage.getItem("token")
    });
  }

  logOut = async () => {
    console.log(
      localStorage.getItem("loggedIn") + "  " + localStorage.getItem("token")
    );
    let res=await axios.get("https://lirten-hub-guc.herokuapp.com/api/auth/logout",{headers: { Authorization: `Bearer ` + this.state.token }
  })
    
    localStorage.setItem("loggedIn", false);
    localStorage.setItem("token", null);
    window.location.reload();
    this.render();
  };

  render() {
    let logged = localStorage.getItem("loggedIn") === "true";

    if (!logged) {
      // return (
      //   <div> <ShowMessage /> </div>
      // );
      if (this.state.wantsToLogin)
        return (
          <div>
            {" "}
            <ButtonAppBar flag={this.loginORsignup} />
            <ShowMessage flag1={this.state.isSuccessfulReg} flagPass={this.state.samePassFlag} wrongEmail={this.state.wrongEmailOrPass}/>
            <SignIn
              signInMethod={this.logIn}
              mail={this.emailHandler}
              pass={this.passwordHandler}
            />
          </div>
        );
      else
        return (
          <div>
            <ButtonAppBar flag={this.loginORsignup} />
            <ShowMessage flag1={this.state.isSuccessfulReg} flagPass={this.state.samePassFlag}wrongEmail={this.state.wrongEmailOrPass}/>
            <SignUp
              signUpMethod={this.signUp}
              mail={this.emailHandler}
              pass={this.passwordHandler}
              t={this.typeHandler}
            />
            {/* <FormPage /> */}
          </div>
        );
    }

    return (
      <div>
        <div className="Header">
          <HeaderBar token={this.state.token} logOut={this.logOut} />
        </div>
        <Router>
          <div
            className="App"
            style={{ marginLeft: "15%", marginTop: "3%", paddingTop: "3%" }}
          >
            <Route
              exact
              path="/"
              style={{}}
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
              render={() => <EventList setTheEvent={this.setTheEvent} token={this.state.token}  />}
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

              path="/Main"
              render={props => <Tabs token={this.state.token} value={0} setTheEvent={this.setTheEvent} />}
            />
            <Route
              exact
              path="/Main/Notifications"
              render={props => <Tabs token={this.state.token} value={0} setTheEvent={this.setTheEvent} />}
            />
            <Route
              exact
              path="/Main/Tasks"
              render={props => <Tabs token={this.state.token} value={1} setTheEvent={this.setTheEvent} />}
            />  
             <Route
              exact
              path="/Main/MyTasks"
              render={props => <Tabs token={this.state.token} value={2} setTheEvent={this.setTheEvent} />}
            />  
            <Route
              exact
              path="/Main/MyEvents"
              render={props => <Tabs token={this.state.token} value={3} setTheEvent={this.setTheEvent} />}
            />  
            <Route
              exact
              path="/Main/Requests"
              render={props => <Tabs token={this.state.token} value={4} setTheEvent={this.setTheEvent} />}
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
