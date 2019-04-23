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
    editRequestData:{
      id:'',
      description:'',
      registrationPrice:0,
      numberOfSpaces:0
    },
    newRequestModal:false,
    editRequestModal:false
  }


  componentWillMount(){

    axios.get('https://lirten-hub-guc.herokuapp.com/api/eventRequests').then((response)=>{

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


  toggleEditRequestModal(){
    this.setState({
      editRequestModal:! this.state.editRequestModal
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
    axios.post('https://lirten-hub-guc.herokuapp.com/api/eventRequests',this.state.newRequestData).then((response)=>{

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


  getRequests = async  ()=> {
        
    const res = await axios.get(
      "http://localhost:3000/api/eventRequests/", {headers: { Authorization: `Bearer ` + this.props.token }}
    );
    this.setState({ eventRequests: res.data.data });
     
  };


  UpdateEventRequest = async()=>{
    let { 
     description,registrationPrice,numberOfSpaces  } = this.state.editRequestData;
try{
    await axios.put('http://localhost:3000/api/eventRequests/' + this.state.editRequestData.id, {
     
      description,registrationPrice,numberOfSpaces
    },{headers: { Authorization: `Bearer ` + this.props.token }}).then((response) => {
      
      this.getRequests()
      this.setState({
        editRequestModal: false, editRequestData: { id: '', 
        description:"",
      registrationPrice:0,
    numberOfSpaces:0
    }
      })
    });
  }
  catch(error)
  {
    alert(   error+"\n"+"There is an error in your updates")
  }
  }


  deleteEventRequest(id) {
    axios.delete('http://localhost:3000/api/eventRequests/' + id,{headers: { Authorization: `Bearer ` + this.props.token }}).then((response) => {
     this.getRequests()
    });
  }

  editEventRequest(id,description,registrationPrice,numberOfSpaces){

    this.setState({
      editRequestData:{id,description,registrationPrice,numberOfSpaces},
      editRequestModal:! this.state.editRequestModal
    })
  }



  render() {
    let eventRequests=this.state.eventRequests.map((eventRequest)=>{
      return(
        <div style={{color:"#000"}}>

        <tr key={eventRequest.id}>
       
        <th>{eventRequest.description }</th>
        <th>{eventRequest.numberOfSpaces }</th>
        <td>

          <Button color="success" size="sm" className="mr-2" onClick={this.editEventRequest.bind(this,eventRequest['_id'],eventRequest.description,eventRequest.registrationPrice,eventRequest.numberOfSpaces)}>Edit</Button>
          <Button color="danger" size="sm" onClick={this.deleteEventRequest.bind(this,eventRequest['_id'])}>Delete</Button>
        </td>
      </tr>
        </div>

      )
    })

    return (
      <div className="App container" style={{color:"#000"}}>
      <h3 >Create Your Event</h3>
      <Button className="my-3" color="primary" onClick={this.toggleNewRequestModal.bind(this)}>add Request</Button>
        <Modal isOpen={this.state.newRequestModal} toggle={this.toggleNewRequestModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewRequestModal.bind(this)}>Add EventRequest</ModalHeader>
          <ModalBody>
          <FormGroup>
          
          <br></br>
          <Label for="description" >Description</Label>
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
          
          
      </FormGroup>          
      </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addRequest.bind(this)}>Add EventRequest</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewRequestModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.editRequestModal} toggle={this.toggleEditRequestModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditRequestModal.bind(this)}>Edit EventRequest</ModalHeader>
          <ModalBody>
          <FormGroup>
          
          <br></br>
          <Label for="description">Description</Label>
          <Input id="description" value={this.state.editRequestData.description} onChange={(e)=>{
            let {editRequestData}=this.state;
            editRequestData.description=e.target.value;
            this.setState({editRequestData})
          }}/>
          <br></br>
          <Label for="registrationPrice">RegistrationPrice</Label>
          <Input id="registrationPrice" value={this.state.editRequestData.registrationPrice} onChange={(e)=>{
            let {editRequestData}=this.state;
            editRequestData.registrationPrice=parseInt(e.target.value,10);
            this.setState({editRequestData})
          }}/>
          <br></br>
          <Label for="numberOfSpaces">NumberOfSpaces</Label>
          <Input id="numberOfSpaces" value={this.state.editRequestData.numberOfSpaces} onChange={(e)=>{
            let {editRequestData}=this.state;
            editRequestData.numberOfSpaces=parseInt(e.target.value,10);
            this.setState({editRequestData})
          }}/>
          <br></br>
          
          
          
      </FormGroup>          
      </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.UpdateEventRequest.bind(this)}>Update EventRequest</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditRequestModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>



        <Table striped>

          <thead>
            <tr>
              
              <th>description </th>
              <th>numberOfSpaces </th>
              <th>Actions</th>

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
