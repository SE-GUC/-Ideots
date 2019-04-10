import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import './App.css';

import Notification from './components/notifications/Notifications'


class App extends Component {
 



  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
              <Route path='/notifications' render={props=>(
                  <React.Fragment>
                      <Notification  />
                  </React.Fragment>

              )}
              />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
