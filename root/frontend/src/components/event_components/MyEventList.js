import React, { Component } from "react";
import EventCard from "./EventCard";
import axios from "axios";

export class MyEventList extends Component {
  state = {
    events: [],
    id: this.props.id
  };
  componentDidMount() {
    this.fetchEvents();
  } 

  fetchEvents = () => {
    try {
      const { id } = this.state;
      axios
        .get("https://lirten-hub-guc.herokuapp.com/api/events/Organizer/organizer", {
          headers: { Authorization: `Bearer ` + this.props.token }
        })
        .then(res => {
          this.setState({ events: this.state.events.concat(res.data.data) });
        });
    } catch (error) {
      this.setState({ events: [] });
    }
  };

  render() {
    return (
      <div>
        {this.state.events.map(event => (
           <EventCard key={event._id} event={event} setTheEvent={this.props.setTheEvent} />
        ))}
        <h3
          style={{
            width: "100%",
            height: "50px",
            backgroundColor: "#ccc",
            lineHeight: "50px",
            textAlign: "center",
            fontSize: "20px",
            marginBottom: "5px"
          }}
        >
          No More Event
        </h3>
      </div>
    );
  }
}

export default MyEventList;
