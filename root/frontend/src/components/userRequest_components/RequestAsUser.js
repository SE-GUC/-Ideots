import React, { Component } from 'react';
import axios from 'axios';
import {  Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button ,Alert} from 'reactstrap';
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
        "https://lirten-hub-guc.herokuapp.com/api/requests/", {headers: { Authorization: `Bearer ` + this.props.token }}
      );
      this.setState({ requests: res.data.data });
       
    };
 

    addRequest = async() => {
      try{
      await axios.post('https://lirten-hub-guc.herokuapp.com/api/requests/', this.state.newRequestData,{headers: { Authorization: `Bearer ` + this.props.token }}).then((response) => {
        let { requests } = this.state;
  
       // requests.push(response.data);
  
        this.setState({ requests, newRequestModal: false, newRequestData: {
        description : '',
        
       
        }});
      });}
      catch(error){
        alert(   error+"\n"+"Description is required")
      }
    }
    
    addTask = async(req,res) => {
      try{
        await axios.post('https://lirten-hub-guc.herokuapp.com/api/tasks/', this.state.newTaskData,{headers: { Authorization: `Bearer ` + this.props.token }}).then((response) => {
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
        catch(error)
        {

          alert(
            error+"\n"+
            "Check the following :-" +"\n"
                +"- Description is required" +"\n"
                +"- Required Skills is required" +"\n"
                +"- Category is required" +"\n"
                +'- Required Skills should be in the form of ["skill1","skill2"..]' +"\n")
        } 
      
    
      }
    updateRequest = async()=>{
      let { 
       description  } = this.state.editRequestData;
  try{
      await axios.put('https://lirten-hub-guc.herokuapp.com/api/requests/' + this.state.editRequestData.id, {
       
        description
      },{headers: { Authorization: `Bearer ` + this.props.token }}).then((response) => {
        
        this.getRequests()
        this.setState({
          editRequestModal: false, editRequestData: { id: '', 
          description:"" }
        })
      });
    }
    catch(error)
    {
      alert(   error+"\n"+"Description can't be empty")
    }
    }
    editRequest( id,description ) {
      this.setState({
        editRequestData: { id, 
          description }, editRequestModal: ! this.state.editRequestModal
      });
    }
    deleteRequest(id) {
      axios.delete('https://lirten-hub-guc.herokuapp.com/api/requests/' + id,{headers: { Authorization: `Bearer ` + this.props.token }}).then((response) => {
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
                <td style={{color:"#00"}}>{request.feedback}</td>
                <td style={{color:"#000"}}>{request.date}</td>
                <td style={{color:"#000"}}>
            <Button color="success" size="sm" className="mr-2" onClick={this.editRequest.bind(this, request['_id'],request.accepted,request.feedback)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteRequest.bind(this, request['_id'])}>Delete</Button>
          </td>

       
                
              </tr>
            )
          }):""
          return (
            
            <div className="App container">
      
            <h1 style={{color:"#000"}}>Requests</h1>
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
      <Input id="requiredSkills" value={this.state.newTaskData.requiredSkills}
      
      onChange={(e) => {
     
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
export default RequestAsUser;