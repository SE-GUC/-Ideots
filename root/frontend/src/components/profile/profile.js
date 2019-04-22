import React, { Component } from 'react'
import axios from 'axios'
import Info from './info'

export class profile extends Component {
    state={
        info:[],
        

    }
    componentWillMount() {
      
        this.fetchEvents();
        
      }
    
      fetchEvents = () => {
         
        try {
          const { id,info } = this.state;
          
          axios
            .get("http://localhost:3000/api/users/User", {headers: { Authorization: `Bearer ` + this.props.token }
            })
            .then(res => {
               console.log('aaaaaaaaaaaaaaaaaaaaaaaa',res.data)
                this.setState({ info:res.data});
                
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
       <Info info={this.state.info}/>
      </div>
    )
  }
}

export default profile
