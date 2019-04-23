import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import { Button } from '@material-ui/core';
import Axios from 'axios';



export default class Welcome extends Component {
    state={
        eventsList:[]
    }
 
    getThemAll = async()=>{
      console.log(this.props.token)
      let res=await Axios.get('https://lirten-hub-guc.herokuapp.com/api/events',
      { headers: { 'Authorization': `Bearer `+this.props.token }})
      console.log(res)
  }
  
  
  
 render() {
    return (
        <Router>
        <Route path='/welcome'>
    <div>
      <h3>
          Welcome 
      </h3>
      <Button onClick={this.getThemAll} >get w rabena yostor</Button>
    </div>
    </Route>
    </Router>
    )
  }
}
