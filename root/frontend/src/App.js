

import React, { Component } from "react";

  
import Request from './components/Request'
import RequestAsUser from './components/RequestAsUser'
import Tabs from "./components/tab_components/tabs";
import Home from "./components/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HeaderBar from "./components/navbar_components/HeaderAppBar";
import EventList from "./components/event_components/EventList";
import Event from "./components/event_components/Event";






class App extends Component {
  state = {
    clickedEvent: {
    }
  }
  setTheEvent=(eventProps)=>{
    this.setState({
      clickedEvent:eventProps
    })
  }
  render() {
    return (

      <Router>
       <HeaderBar />
       <Route path="/" render={props => <Tabs />} />
        <div className="App">
          <Route  path="/" render={props => <Home />} />
         
          <Route
            path="/requests"
            render={props => <Request  />}
          />
           <Route
            path="/UserRequests"
            render={props => <RequestAsUser  />}
          />
           <Route
            exact
            path="/EventList"
            render={() => <EventList setTheEvent={this.setTheEvent} />}
          />
          
          <Route
          exact
          path="/Event"
          render={() => 
            <Event key={this.state.clickedEvent._id} event={this.state.clickedEvent} />
           } 
        />
         
        </div>
      </Router>

    );
  }
}

export default App;
