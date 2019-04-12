import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Background from './backy.jpg';
import axios from "axios" 
export class Event extends Component {
  state = {
    modal: false,
    title: "",
    body: "",
    event: {
      location: {
        city: "cairo",
        Street: "Abbas al akkad",
        Area: "nasr city"
      },
      description:
        " hallo it is me i was wondering if after all these years you would like to meet ",

      type: "singing",
      registrationPrice: 250,
      numberOfSpaces: 200,
      speakers: ["ahmad", "Ali"],
      topics: ["things", "another things "],
      dateTime: new Date(2011, 0, 1, 0, 0, 0, 0),
      organizerId: "alkfsnlaknsflaknflkn alksndlkn asd",
      numberOfRegisterations: 12,
      eventRequestId: "fsafas2f1as2f1a2fs121",
      rate: 5
    }
  };
  componentDidMount() {
    this.setState({
      event : this.props.event 
    })
  }


  

  modalToggle = async whichOne => {
    this.setState({
      modal: !this.state.modal
    });
    console.log(this.props.event._id)
    switch (whichOne) {
      case "Description":
        this.setState({
          title: "Description",
          body: this.state.event.description ? this.state.event.description : "no available data"
        });
        break;
      case "Location":
        const specific = ()=>{
          return (
            <ul>
            <li>City : {this.state.event.location? this.state.event.location.city  : "no available data"} </li>
            <li>Area : {this.state.event.location ?this.state.event.location.Area : "no available data"} </li>
            <li>Street : {this.state.event.location ?this.state.event.location.Street : "no available data"} </li>
            </ul>
          ) ; 
        }
        this.setState({
          title: "Location",
          body: specific()
        });
        break;
      case "Type":
        this.setState({
          title: "Type",
          body: this.state.event.type ? this.state.event.type : "no available data"
        });
        break;
      case "Registration Price":
        this.setState({
          title: "Registration Price",
          body: this.state.event.registrationPrice ? this.state.event.registrationPrice  : "no available data"
        });
        break;
      case "Seats":
        this.setState({
          title: "Remaining Seats",
          body:
            this.state.event.numberOfSpaces -
            this.state.event.numberOfRegisterations
        });
        break;
      case "Speakers":
        const speakers = this.state.event.speakers.map(speaker => {
          return <li> {speaker} </li>;
        });
        this.setState({
          title: "Speakers",
          body: speakers
        });
        break;

      case "Topics":
        const topics = this.state.event.topics.map(topic => {
          return <li> {topic} </li>;
        });
        this.setState({
          title: "Topics",
          body: topics
        });
        break;

      case "when":
        this.setState({
          title: "when",
          body: this.state.event.dateTime ? this.state.event.dateTime.toString() :"no available data "
        });
        break;
      case "who made this event?":
      const bod = this.state.event.organizerId ?  await this.getTheNameOfOrganizer(this.state.event.organizerId) :"no available data"
      console.log(this.state.event.organizerId)
        this.setState({
          title: "who made this event ?",
          body:  bod
        });
        break;
    }
  };

  getTheNameOfOrganizer = async id =>{
   const user= await axios.get(`http://localhost:3000/api/users/${id}`)
   const name = user.data.name 
   return name  
  }

  render() {
    const title = this.state.title;
    const body = this.state.body;
    return (
        <div>
        {/* <img src={Background}  alt="background" style= {{width :'100%' , height:'100%' , objectFit:'contain'}}  /> */}

        <Button
          outline
          color="primary"
          style ={{position:'absolute' , left:'40%' , top :'17%' , width: 190, height: 100}}
          onClick={this.modalToggle.bind(this, "Description")}
        >
          Description
        </Button>{" "}
        <Button
          outline
          style ={{position:'absolute' , left:'20%' , top :'30%', width: 150, height: 50}}
          color="secondary"
          onClick={this.modalToggle.bind(this, "Location")}
        >
          Location
        </Button>{" "}
        <Button
          outline
          style ={{position:'absolute' , left:'60%' , top :'60%' , width: 150, height: 50}}
          color="danger"
          onClick={this.modalToggle.bind(this, "Type")}
        >
          Type
        </Button>{" "}
        <Button
          outline
          style ={{position:'absolute' , left:'32%' , top :'40%' , width: 150, height: 50}}
          color="success"
          onClick={this.modalToggle.bind(this, "Registration Price")}
        >
          Registration Price
        </Button>{" "}
        <Button
          outline
          style ={{position:'absolute' , left:'47%' , top :'38%' ,width: 150, height: 50}}

          color="info"
          onClick={this.modalToggle.bind(this, "Seats")}
        >
          Seats
        </Button>{" "}
        <Button
          outline
          style ={{position:'absolute' , left:'30%' , top :'50%' , width: 150, height: 50}}
          color="info"
          onClick={this.modalToggle.bind(this, "Speakers")}
        >
          Speakers
        </Button>{" "}
        <Button
          outline
          style ={{position:'absolute' , left:'50%' , top :'50%', width: 150, height: 50}}
          color="warning"
          onClick={this.modalToggle.bind(this, "Topics")}
        >
          Topics
        </Button>{" "}
        <Button
          outline
          style ={{position:'absolute' , left:'60%' , top :'30%' , width: 150, height: 50}}
          color="info"
          onClick={this.modalToggle.bind(this, "when")}
        >
          when{" "}
        </Button>{" "}
        <Button
          outline
          style ={{position:'absolute' , left:'35%' , top :'60%' , width: 150, height: 60}}
          color="info"
          onClick={this.modalToggle.bind(this, "who made this event?")}
        >
          who made this event?{" "}
        </Button>{" "}
        <Modal isOpen={this.state.modal} toggle={this.modalToggle}>
          <ModalHeader key = {this.state.event._id} toggle={this.modalToggle}>{title}</ModalHeader>
          <ModalBody>{body}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.modalToggle}>
              OK
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Event;
