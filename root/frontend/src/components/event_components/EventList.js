import React, { Component } from "react";
import EventCard from "./EventCard";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

export class EventList extends Component {
  state = {
    events: [],
    count: 2,
    offset: 0,
    hasMore: true
  };
  componentDidMount() {
    console.log(this.props.token)
    this.fetchEvents();
    
  }

  fetchEvents = () => {
    const { count, offset } = this.state;
    this.setState({ offset: offset + count });

    axios
      .get(
        "https://lirten-hub-guc.herokuapp.com/api/events/withRange/" + count + "/" + offset,
        {
          headers: { Authorization: `Bearer ` + this.props.token }
        }
      )
      .then(res => {
        if (res.data.data.length > 0) {
          this.setState({ events: this.state.events.concat(res.data.data) });
          console.log(this.state.events.concat(res.data.data) )
          console.log("hahahahhahahahahha")

        } else {
          this.setState({ hasMore: false });
        }
      });
  };

  render() {
    return (
      <div>
        
        <InfiniteScroll
          hasMore={this.state.hasMore}
          dataLength={this.state.events.length}
          next={this.fetchEvents}
          endMessage={
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
          }
          loader={
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
              Loading...
            </h3>
          }
        >
          {this.state.events.map(event => (
            <EventCard key={event._id} event={event} setTheEvent={this.props.setTheEvent} token={this.props.token}/>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default EventList;
