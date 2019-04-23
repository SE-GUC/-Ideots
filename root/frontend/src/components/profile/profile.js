import React, { Component } from 'react'
import axios from 'axios'
import Info from './info'
import Skills from './skills'
import Interests from './interests'
import Tasks from './tasks';
import Events from './attendedEvents';
import Experience from './experience';
import Certificates from './certificates';
import Field from './field';
import Reports from './reports';
import Specialization from './specialization';

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
        <h1 style={{color:"#fff"}}>profile page</h1>
       <Info style={{margin:"10px" }} info={this.state.info}/>
       
       <Skills style={{margin:"100px"}} info={this.state.info}/>
       <Interests info={this.state.info}/>
       <Tasks info={this.state.info}/>
       <Events info={this.state.info}/>
       <Experience info={this.state.info}/>
       <Certificates info={this.state.info}/>
       <Field info={this.state.info}/>
       <Reports info={this.state.info}/>
       <Specialization info={this.state.info}/>
       
      </div>
    )
  }
}

export default profile
