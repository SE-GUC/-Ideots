import React, { Component } from 'react'
import axios from 'axios'
import Info from './info'

export class profile extends Component {
    state={
        info:[],
        id:"5cae82d478cadf0004c4fdb1"

    }
    componentDidMount() {
        this.fetchEvents();
        //console.log(this.state.info._id)
      }
    
      fetchEvents = () => {
         
        try {
          const { id,info } = this.state;
          axios
            .get("http://localhost:3000/api/users/"+id, {
              headers: { Authorization: `Bearer ` + this.props.token }
            })
            .then(res => {
               console.log(res.data)
                this.setState({ info:res.data });
                console.log(this.state.info)
             
            });
        } catch (error) {
          this.setState({ info: null });
        }
      };
   
  render() {
      
    return (
      <div >
        <h1>profile page</h1>
       <Info     info={this.state.info}/>
      </div>
    )
  }
}

export default profile
