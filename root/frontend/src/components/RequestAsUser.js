import React, { Component } from 'react';
import axios from 'axios';
import {  Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
class RequestAsUser extends Component {
    state = {
      requests: [],
      newRequestData: {
        description : '',
       
        
      },
      tasks:[],
      newTaskData: { 
        description : '', 
        requiredSkills : '', 
        payment : 0 , 
        //timeLine : '' ,  
        state: '' ,  
        category : '' ,
        yearsOfExperience : 0,
        //assignedPerson : Joi.objectId()
        
      },
      
      editRequestData: {
        id : '',
        description : ''
      },
      newRequestModal: false,
      editRequestModal: false,
      newTaskModal: false,
      consult : false,
      needConsultModal :false
    }
    
    toggleNewTaskModal() {
        this.setState({
          newTaskModal: ! this.state.newTaskModal
        });
      }

      toggleNeedConsultModal() {
        this.setState({
          needConsultModal: ! this.state.needConsultModal
        });
      }

    toggleNewRequestModal() {
      this.setState({
        newRequestModal: ! this.state.newRequestModal
      });
    }
    toggleEditRequestModal() {
      this.setState({
        editRequestModal: ! this.state.editRequestModal
      });
    }

    getRequests = async  ()=> {
        
      const res = await axios.get(
        "http://localhost:3000/api/requests/" 
      );
      this.setState({ requests: res.data.data });
       
    };
 

    addRequest = async() => {
      await axios.post('http://localhost:3000/api/requests/', this.state.newRequestData).then((response) => {
        let { requests } = this.state;
  
       // requests.push(response.data);
  
        this.setState({ requests, newRequestModal: false, newRequestData: {
        description : '',
        
       
        }});
      });
    }
    
    addTask = async() => {
        await axios.post('http://localhost:3000/api/tasks/', this.state.newTaskData).then((response) => {
          let { tasks } = this.state;
    
         // requests.push(response.data);
    
          this.setState({ tasks, newTaskModal: false, newTaskData: {
            description : '', 
            requiredSkills : '', 
            payment : 0 , 
            //timeLine : '' ,  
            state: '' ,  
            category : '' ,
            yearsOfExperience : 0,
          }});
        });
      }
    updateRequest = async()=>{
      let { 
       description  } = this.state.editRequestData;
  
      await axios.put('http://localhost:3000/api/requests/' + this.state.editRequestData.id, {
       
        description
      }).then((response) => {
        
        this.getRequests()
        this.setState({
          editRequestModal: false, editRequestData: { id: '', 
          description:"" }
        })
      });
    }
    editRequest( id,
     description ) {
      this.setState({
        editRequestData: { id, 
          description }, editRequestModal: ! this.state.editRequestModal
      });
    }
    deleteRequest(id) {
      axios.delete('http://localhost:3000/api/requests/' + id).then((response) => {
       this.getRequests()
      });
    }
       
    
      

    render() {
      this.getRequests()
      
    
       let  requests = this.state.requests?this.state.requests.map((request) => {
       
        const acceptance =request.accepted===undefined? 'pending': ''+request.accepted
        return (
              
              
              <tr key={request.id}>
                <td>{request.description}</td>
                 
                <td>{acceptance}</td>
                <td>{request.feedback}</td>
                <td>{request.date}</td>
                <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editRequest.bind(this, request['_id'],request.accepted,request.feedback)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteRequest.bind(this, request['_id'])}>Delete</Button>
          </td>

       
                
              </tr>
            )
          }):""
          return (
            <div className="App container">
      
            <h1>Requests</h1>
            <Button className="my-3" color="primary" onClick={this.toggleNeedConsultModal.bind(this)}>Add Request</Button>

            <Modal isOpen={this.state.needConsultModal} toggle={this.toggleNeedConsultModal.bind(this)}>
  <ModalHeader toggle={this.toggleNeedConsultModal.bind(this)}>consultancy</ModalHeader>
  <ModalBody>
    <FormGroup>
      <Label for="Consult">do you need consultancy?</Label>
      <Input id="Consult" value={this.state.consult} onChange={(e) => {
        let { consult } = this.state;

        consult = e.target.value;

        this.setState({ consult });
      }} />
    </FormGroup>
    </ModalBody>
  <ModalFooter>
    <Button color="primary" onClick={ this.state.consult?this.toggleNewRequestModal.bind(this):this.toggleNewTaskModal.bind(this)}>Confirm</Button>{' '}
    <Button color="secondary" onClick={this.toggleNeedConsultModal.bind(this)}>Cancel</Button>
  </ModalFooter>
</Modal>


<Modal isOpen={this.state.newRequestModal} toggle={this.toggleNewRequestModal.bind(this)}>
  <ModalHeader toggle={this.toggleNewRequestModal.bind(this)}>Add a new Request</ModalHeader>
  <ModalBody>
    <FormGroup>
      <Label for="description">description</Label>
      <Input id="description" value={this.state.newRequestData.description} onChange={(e) => {
        let { newRequestData } = this.state;

        newRequestData.description = e.target.value;

        this.setState({ newRequestData });
      }} />
    </FormGroup>
   
  </ModalBody>
  <ModalFooter>
    <Button color="primary" onClick={this.addRequest.bind(this)}>Add Request</Button>{' '}
    <Button color="secondary" onClick={this.toggleNewRequestModal.bind(this)}>Cancel</Button>
  </ModalFooter>
</Modal>

       

<Modal isOpen={this.state.newTaskModal} toggle={this.toggleNewTaskModal.bind(this)}>
  <ModalHeader toggle={this.toggleNewTaskModal.bind(this)}>Add a new Task</ModalHeader>
  <ModalBody>
    <FormGroup>
      <Label for="description">description</Label>
      <Input id="description" value={this.state.newTaskData.description} onChange={(e) => {
        let { newTaskData } = this.state;

        newTaskData.description = e.target.value;

        this.setState({ newTaskData });
      }} />
    </FormGroup>
   

    <FormGroup>
      <Label for="requiredSkills">requiredSkills</Label>
      <Input id="requiredSkills" value={this.state.newTaskData.requiredSkills} onChange={(e) => {
        let { newTaskData } = this.state;

        newTaskData.requiredSkills = e.target.value;

        this.setState({ newTaskData });
      }} />
    </FormGroup>

    <FormGroup>
      <Label for="payment">payment</Label>
      <Input id="payment" value={this.state.newTaskData.payment} onChange={(e) => {
        let { newTaskData } = this.state;

        newTaskData.payment = e.target.value;

        this.setState({ newTaskData });
      }} />
    </FormGroup>

    <FormGroup>
      <Label for="state">state</Label>
      <Input id="state" value={this.state.newTaskData.state} onChange={(e) => {
        let { newTaskData } = this.state;

        newTaskData.state = e.target.value;

        this.setState({ newTaskData });
      }} />
    </FormGroup>

    <FormGroup>
      <Label for="category">category</Label>
      <Input id="category" value={this.state.newTaskData.category} onChange={(e) => {
        let { newTaskData } = this.state;

        newTaskData.category = e.target.value;

        this.setState({ newTaskData });
      }} />
    </FormGroup>

    <FormGroup>
      <Label for="yearsOfExperience">yearsOfExperience</Label>
      <Input id="yearsOfExperience" value={this.state.newTaskData.yearsOfExperience} onChange={(e) => {
        let { newTaskData } = this.state;

        newTaskData.yearsOfExperience = e.target.value;

        this.setState({ newTaskData });
      }} />
    </FormGroup>

   

  </ModalBody>
  <ModalFooter>
    <Button color="primary" onClick={this.addTask.bind(this)}>Add Task</Button>{' '}
    <Button color="secondary" onClick={this.toggleNewTaskModal.bind(this)}>Cancel</Button>
  </ModalFooter>
</Modal>

         
<Modal isOpen={this.state.editRequestModal} toggle={this.toggleEditRequestModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditRequestModal.bind(this)}>Edit a new Request</ModalHeader>
        <ModalBody>
          
        
          <FormGroup>
           
             <Label for="description">description</Label>
            <Input id="description" value={this.state.editRequestData.description} onChange={(e) => {
              let { editRequestData } = this.state;

              editRequestData.description = e.target.value;

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
                    
                    <th>Description</th>
                    
                    <th>Accepted</th>
                    <th>Feedback</th>
                    <th>Date</th>
                    <th>Actions</th>
                    
                  
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
export default RequestAsUser;