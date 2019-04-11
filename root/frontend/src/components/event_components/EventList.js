import React, { Component } from "react";
import axios from "axios";

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
    return <h3>hello world</h3>;
  }
}

export default EventList;
