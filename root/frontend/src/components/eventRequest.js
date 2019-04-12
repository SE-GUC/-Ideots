import React, { Component } from 'react';
import axios from 'axios'
import {Input,FormGroup,Label,Modal,ModalBody,ModalHeader,ModalFooter,Table,Button} from 'reactstrap';

class eventRequest extends Component {
  state={
    eventRequests:[],
    newRequestData:{
     // location:"",
     
      description:"",
      registrationPrice:0,
      numberOfSpaces:0,
      organizerId:""
    },
    newRequestModal:false
  }


  componentWillMount(){

    axios.get('http://localhost:3000/api/eventRequests').then((response)=>{

      this.setState({
        eventRequests:response.data.data
      })
    });
  }


  toggleNewRequestModal(){
   this.setState({
     newRequestModal:! this.state.newRequestModal
   })
  }


  addRequest(){
    console.log("maher")
    const stst = {
      description:"QQQQQQ12323111111111111111111111111111111111111444444444444444444444444444444444444444444444444111111111111111111111111111111111",
     registrationPrice:12,
     numberOfSpaces:123,
     organizerId:"987654321987654321987654"
    }
    console.log(this.state.newRequestData)
    axios.post('http://localhost:3000/api/eventRequests',this.state.newRequestData).then((response)=>{

    let {eventRequests}=this.state  ;
    eventRequests.push(response.data.data)
    this.setState({eventRequests,newRequestModal:false, newRequestData:{
     // location:{},
     
      description:"",
      registrationPrice:0,
      numberOfSpaces:0,
      organizerId:""
    }}) 

  })

  }


  render() {
    let eventRequests=this.state.eventRequests.map((eventRequest)=>{
      return(
        <tr key={eventRequest.id}>
       
        <th>{eventRequest.description }</th>
        <th>{eventRequest.numberOfSpaces }</th>
      </tr>

      )
    })

    return (
      <div className="App container">
      <h3>Create Your Event</h3>
      <Button className="my-3" color="primary" onClick={this.toggleNewRequestModal.bind(this)}>add Request</Button>
        <Modal isOpen={this.state.newRequestModal} toggle={this.toggleNewRequestModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewRequestModal.bind(this)}>Modal title</ModalHeader>
          <ModalBody>
          <FormGroup>
          
          <br></br>
          <Label for="description">Description</Label>
          <Input id="description" value={this.state.newRequestData.description} onChange={(e)=>{
            let {newRequestData}=this.state;
            newRequestData.description=e.target.value;
            this.setState({newRequestData})
          }}/>
          <br></br>
          <Label for="registrationPrice">RegistrationPrice</Label>
          <Input id="registrationPrice" value={this.state.newRequestData.registrationPrice} onChange={(e)=>{
            let {newRequestData}=this.state;
            newRequestData.registrationPrice=parseInt(e.target.value,10);
            this.setState({newRequestData})
          }}/>
          <br></br>
          <Label for="numberOfSpaces">NumberOfSpaces</Label>
          <Input id="numberOfSpaces" value={this.state.newRequestData.numberOfSpaces} onChange={(e)=>{
            let {newRequestData}=this.state;
            newRequestData.numberOfSpaces=parseInt(e.target.value,10);
            this.setState({newRequestData})
          }}/>
          <br></br>
          <Label for="organizerId">OrganizerId</Label>
          <Input id="organizerId" value={this.state.newRequestData.organizerId} onChange={(e)=>{
            let {newRequestData}=this.state;
            newRequestData.organizerId=e.target.value;
            this.setState({newRequestData})
            
          }}/>
           {/* <Label for="topic">OrganizerId</Label>
          <Input id="organizerId" value={this.state.newRequestData.organizerId} onChange={(e)=>{
            let {newRequestData}=this.state;
            newRequestData.organizerId=e.target.value;
            this.setState({newRequestData})
            
          }}/>
           <Label for="organizerId">OrganizerId</Label>
          <Input id="organizerId" value={this.state.newRequestData.organizerId} onChange={(e)=>{
            let {newRequestData}=this.state;
            newRequestData.organizerId=e.target.value;
            this.setState({newRequestData})
            
          }}/>
           <Label for="organizerId">OrganizerId</Label>
          <Input id="organizerId" value={this.state.newRequestData.organizerId} onChange={(e)=>{
            let {newRequestData}=this.state;
            newRequestData.organizerId=e.target.value;
            this.setState({newRequestData})
            
          }}/> */}
          
      </FormGroup>          
      </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addRequest.bind(this)}>Add EventRequest</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewRequestModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>



        <Table striped>

          <thead>
            <tr>
              
              <th>description </th>
              <th>numberOfSpaces </th>

            </tr>
          </thead>

          <tbody>
           {eventRequests}
           


          </tbody>



        </Table>

        
       
      </div>
    );
  }
}

export default eventRequest;
