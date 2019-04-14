
import { BrowserRouter as Router, Route } from "react-router-dom";
import HeaderBar from "./components/navbar_components/HeaderAppBar";
import EventList from "./components/event_components/EventList";
import Event from "./components/event_components/Event";

import React, { Component } from "react";



export class App extends Component {
state = {
  clickedEvent: {
  }
}
setTheEvent=(eventProps)=>{
  console.log(eventProps)
  this.setState({
    clickedEvent:eventProps
  })
}
  render() {
    return (
      <Router>
        <div className="Header">
          <HeaderBar/>
        </div>
        <div className="App">
         

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
