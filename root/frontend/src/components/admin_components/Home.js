import React, { Component } from 'react'

//import Button from '@material-ui/core/Button';
import axios from 'axios'

import Comp from './ListItemComposition'


class Home extends Component {
    state={
        admin:{}
    }

componentDidMount() {
    this.fetchadmin();
 }

 fetchadmin=()=>{
    axios
    .get("https://lirten-hub-guc.herokuapp.com/api/admins/5ca7c905fab5b62ebca5565b")
    .then(res => {
        console.log(res.data._id)
        this.setState({ admin : res.data });
        console.log(this.state.admin)
      
    });

 }


  render() {    
    
    return (
      <div className = "Home"  >
      
      
       
        <Comp />
        <h3>@info</h3>
        <p>{"name : "+this.state.admin.name}</p>
        <p>{"email : "+ this.state.admin.email}</p>
        <p>{"phone : "+this.state.admin.phone}</p>
        
       
      </div>
    )
  }
}
export default Home
