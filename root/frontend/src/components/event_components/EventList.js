import React, { Component } from "react";
import Event from "./EventCard";
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
    this.fetchEvents();
  }

  fetchEvents = () => {
    const { count, offset } = this.state;
    this.setState({ offset: offset + count });
    axios
      .get("http://localhost:3000/api/events/withRange/" + count + "/" + offset)
      .then(res => {
        if (res.data.data.length > 0) {
          this.setState({ events: this.state.events.concat(res.data.data) });
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
          endMessage={<h3>No More Event</h3>}
          loader={<h3>Loading...</h3>}
        >
          {this.state.events.map(event => (
            <Event key={event._id} event={event} />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default EventList;
