import React, { Component } from 'react';
import axios from 'axios';
import {  Table } from 'reactstrap';
class Request extends Component {
    state = {
      requests: [],
        
      }
       
    
    componentDidMount() {
      axios.get('http://localhost:3000/api/requests/').then(res => {
        this.setState({
          requests: res.data.data      })
          
      });
    };
    render() {
        let requests = this.state.requests.map((request) => {
            return (
              <tr key={request["_id"]}>
                <td>{request.description}</td>
                <td>{request.partnerID}</td>
                <td>{request.consultancyID}</td>
                <td>{''+request.consult}</td>
                <td>{''+request.accepted}</td>
                <td>{request.feedback}</td>

       
                
              </tr>
            )
          });
          return (
            <div className="App container">
      
            <h1>Requests</h1>
      
              <Table>
                <thead>
                  <tr>
                    
                    <th>Description</th>
                    <th>partnerID</th>
                    <th>consultancyID</th>
                    <th>consult</th>
                    <th>accepted</th>
                    <th>feedback</th>
                    
                  
                  </tr>
                </thead>
      
                <tbody>
                  {requests}
                </tbody>
              </Table>
            </div>
          );
        }
}
export default Request;