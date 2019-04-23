import React, { Component } from 'react';
import axios from 'axios';
import {  Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
class Request2 extends Component {
    state = {
      requests: [],
     
      
      editRequestData: {
        id : '',
        accepted :'',        
        feedback : '',
      },
      newRequestModal: false,
      editRequestModal: false
    }
    
    
    
    toggleEditRequestModal() {
      this.setState({
        editRequestModal: ! this.state.editRequestModal
      });
    }

    getRequests = async  ()=> {
        
      const res = await axios.get(
        "https://lirten-hub-guc.herokuapp.com/api/adminRequests/all" 
      );
      this.setState({ requests: res.data.data });
       
    };

    
    updateRequest = async()=>{
      let { 
        accepted ,        
        feedback  } = this.state.editRequestData;
  try{
      await axios.put('https://lirten-hub-guc.herokuapp.com/api/adminRequests/' + this.state.editRequestData.id, {
       
        accepted ,        
        feedback 
      }).then((response) => {
        
        this.getRequests()
        this.setState({
          editRequestModal: false, editRequestData: { id: '', 
          accepted : '',        
          feedback : '', }
        })
      });}catch(error)
      {alert("accepted should be true or false and please write a feedback")}
    }
    editRequest( id,
      accepted ,        
      feedback ) {
      this.setState({
        editRequestData: { id, 
          accepted ,        
          feedback  }, editRequestModal: ! this.state.editRequestModal
      });
    }
    deleteRequest(id) {
      axios.delete('https://lirten-hub-guc.herokuapp.com/api/adminRequests/' + id).then((response) => {
       this.getRequests()
      });
    }
       
    
      

    render() {
      this.getRequests()
      
    
       let  requests = this.state.requests?this.state.requests.map((request) => {
       
        const acceptance =request.accepted===undefined? 'pending': ''+request.accepted
        return (
              
              
              <tr key={request.id}>
                <td style={{color:"#000"}}>{request.description}</td>
                
                <td style={{color:"#000"}}>{acceptance}</td>
                <td style={{color:"#000"}}>{request.feedback}</td>
                <td style={{color:"#000"}}>{request.date}</td>
                <td > 
            <Button color="success" size="sm" className="mr-2" onClick={this.editRequest.bind(this, request['_id'],request.accepted,request.feedback)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteRequest.bind(this, request['_id'])}>Delete</Button>
          </td>

       
                
              </tr>
            )
          }):""
          return (
            <div className="App container">
      
            <h1 style={{color:"#000"}}>Requests</h1>
           

       
                 
         
<Modal isOpen={this.state.editRequestModal} toggle={this.toggleEditRequestModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditRequestModal.bind(this)}>Edit a new Request</ModalHeader>
        <ModalBody>
          
        
          <FormGroup>
            <Label for="accepted">accepted</Label>
            <Input id="accepted" value={this.state.editRequestData.accepted} onChange={(e) => {
              let { editRequestData } = this.state;

              editRequestData.accepted = e.target.value;

              this.setState({ editRequestData });
            }} />
             <Label for="feedback">feedback</Label>
            <Input id="feedback" value={this.state.editRequestData.feedback} onChange={(e) => {
              let { editRequestData } = this.state;

              editRequestData.feedback = e.target.value;

              this.setState({ editRequestData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateRequest.bind(this)}>Update Request</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditRequestModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

              <Table>
                <thead>
                  <tr>
                    
                    <th style={{color:"#000"}}>Description</th>
                
                    <th style={{color:"#000"}}>Accepted</th>
                    <th style={{color:"#000"}}>Feedback</th>
                    <th style={{color:"#000"}}>Date</th>
                    <th style={{color:"#000"}}>Actions</th>
                    
                  
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
export default Request2;