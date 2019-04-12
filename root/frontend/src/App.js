
import React, { Component } from "react";

  
import logo from "./logo.svg";
import Request from './components/Request'
import RequestAsUser from './components/RequestAsUser'
import Tabs from "./components/tab_components/tabs";
import Home from "./components/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import "./App.css";
// import Notification from "./components/notification_components/Notifications";
import HeaderBar from "./components/navbar_components/HeaderAppBar";
import EventList from "./components/event_components/EventList";
import EventCard from "./components/event_components/EventCard";
import Event from "./components/event_components/Event";
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <HeaderBar />
//         {/* <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//         <h1>sadsafasasf</h1>
//         <h1>sadsafasasf</h1>
//         <h1>sadsafasasf</h1>
//         <h1>sadsafasasf</h1>
//         <h1>sadsafasasf</h1>

//         <h1>sadsafasasf</h1>
//         <h1>sadsafasasf</h1>
//         <h1>sadsafasasf</h1>
//         <h1>sadsafasasf</h1>
//         <h1>sadsafasasf</h1>
//         <div className="App">
//       <Route exact path="/" render={props => <Home />} /> */}
//         <Router>
//           <Route path="/" render={props => <Tabs />} />
//           {/* </div> */}
//         </Router>
//       </div>
//     );
//   }
// }
import React, { Component } from "react";



class App extends Component {
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
         
        </div>
      </Router>

    );
  }
}

export default App;
