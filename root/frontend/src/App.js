// import React, { Component } from "react";
// import logo from "./logo.svg";
// import Tabs from "./components/tab_components/tabs";
// import Home from "./components/Home";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import "./App.css";
// import Notification from "./components/notification_components/Notifications";
// import HeaderBar from "./components/navbar_components/HeaderAppBar";
import EventList from './components/event_components/EventList'
import EventCard from './components/event_components/EventCard'

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
import React, { Component } from 'react'

export class App extends Component {
  render() {
    return (
      <div>
        <EventList/>

      </div>

      // <h1>
      //   diiff
      // </h1>
      // <div>

      //   <EventCard/>
        
      // </div>
    ) ; 
  }
}

export default App

