
import React, { Component } from "react";
import logo from "./logo.svg";
import Tabs from "./Components/tab_components/tabs";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Notification from "./Components/notification_components/Notifications";
import HeaderBar from "./Components/navbar_components/HeaderAppBar";
//import Applyfortask from "./Components/Applyfortask-components/Applyfortasks";
import Actions from "./Components/Actions/Actions"
import Applyfortasks from "./Components/Applyfortask-components/Applyfortasks";


class App extends Component {
  render() {
    
    //Try <Actions/> and Try <Applyfortasks> afterward, note don't forget to increment the applicantId in submit() method
    return (
  <div > 
   
   <Actions/>
  </div>

       
    
    );
  }
}

export default App;
