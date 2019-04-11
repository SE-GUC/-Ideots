import React, { Component } from "react";

export class EventList extends Component {
  state = {
    events: [],
    count: 2,
    offset: 0,
    hasMore: true
  };

  render() {
    return <h3>hello world</h3>;
  }
}

export default EventList;
